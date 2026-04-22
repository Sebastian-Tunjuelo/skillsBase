# Architecture Patterns — DDD & SDD

Guía de referencia para estructurar proyectos con Domain-Driven Design (DDD) y Spec-Driven Development (SDD).

---

## 1. Estructura de Capas (layers-)

### layers-dependency-direction

Las dependencias siempre apuntan hacia adentro. `infrastructure` depende de `application`, `application` depende de `domain`. Nunca al revés.

**Incorrecto:**
```typescript
// domain/entities/User.ts
import { PrismaClient } from '@prisma/client' // ❌ framework en domain
```

**Correcto:**
```typescript
// domain/entities/User.ts — solo TypeScript puro
export class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
  ) {}
}

// infrastructure/persistence/PrismaUserRepository.ts
import { PrismaClient } from '@prisma/client' // ✅ framework solo en infrastructure
import { UserRepository } from '../../domain/repositories/UserRepository'
```

---

### layers-no-framework-in-domain

La capa `domain` no importa ningún framework externo. Solo tipos y lógica pura.

---

### layers-application-orchestrates

`application` orquesta llamadas entre domain e infrastructure. No contiene lógica de negocio propia.

**Correcto:**
```typescript
// application/commands/CreateUserHandler.ts
export class CreateUserHandler {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(cmd: CreateUserCommand): Promise<void> {
    const user = User.create(cmd.email) // lógica en domain
    await this.userRepo.save(user)       // persistencia en infrastructure
  }
}
```

---

## 2. Bounded Contexts (context-)

### context-no-cross-import

Un contexto no importa directamente de otro. Se comunican por eventos de dominio o tipos del shared-kernel.

**Incorrecto:**
```typescript
// contexts/orders/application/CreateOrderHandler.ts
import { User } from '../../users/domain/entities/User' // ❌ cross-context import
```

**Correcto:**
```typescript
// shared-kernel/domain/UserId.ts
export type UserId = string

// contexts/orders/domain/entities/Order.ts
import { UserId } from '../../../shared-kernel/domain/UserId' // ✅ shared-kernel
```

---

### context-public-api

Cada contexto expone solo lo necesario a través de su `index.ts`. Todo lo demás es privado.

```typescript
// contexts/users/index.ts
export { CreateUserCommand } from './application/commands/CreateUserCommand'
export { UserCreatedEvent } from './domain/events/UserCreatedEvent'
// No exportar entidades internas, repositorios, etc.
```

---

### context-single-responsibility

Un bounded context = una responsabilidad de negocio. Si un contexto hace demasiado, dividirlo.

```
contexts/
├── users/        # solo gestión de usuarios
├── orders/       # solo gestión de pedidos
├── payments/     # solo procesamiento de pagos
└── notifications/ # solo envío de notificaciones
```

---

## 3. Entidades y Value Objects (domain-)

### domain-entities-have-id

Toda entidad tiene un identificador único explícito e inmutable.

```typescript
export class Order {
  constructor(
    public readonly id: OrderId, // ✅ ID explícito
    public readonly userId: UserId,
    private status: OrderStatus,
  ) {}
}
```

---

### domain-value-objects-immutable

Los value objects son inmutables. Para "modificar" uno, se crea uno nuevo.

```typescript
export class Email {
  private constructor(public readonly value: string) {}

  static create(raw: string): Email {
    if (!raw.includes('@')) throw new Error('Invalid email')
    return new Email(raw.toLowerCase())
  }

  equals(other: Email): boolean {
    return this.value === other.value // comparación por valor
  }
}
```

---

### domain-repositories-are-interfaces

En `domain/repositories/` solo van interfaces. Las implementaciones van en `infrastructure/persistence/`.

```typescript
// domain/repositories/UserRepository.ts
export interface UserRepository {
  findById(id: UserId): Promise<User | null>
  save(user: User): Promise<void>
}

// infrastructure/persistence/PrismaUserRepository.ts
export class PrismaUserRepository implements UserRepository {
  // implementación concreta con Prisma
}
```

---

## 4. Spec-Driven Development (sdd-)

### sdd-spec-before-code

El spec existe antes que la implementación. Define qué hace el sistema antes de cómo lo hace.

```
specs/
└── create-order.spec.md   # primero esto
src/
└── features/
    └── create-order/
        └── handler.ts     # luego esto
```

---

### sdd-types-from-spec

Los tipos TypeScript se derivan del spec, no se inventan durante la implementación.

**Spec:**
```markdown
## CreateOrder
Input: userId (string), items (array de { productId, quantity })
Output: orderId (string), status ("pending")
Errores: USER_NOT_FOUND, PRODUCT_OUT_OF_STOCK
```

**Tipos derivados:**
```typescript
// Derivado directamente del spec, no inventado
interface CreateOrderInput {
  userId: string
  items: Array<{ productId: string; quantity: number }>
}

interface CreateOrderOutput {
  orderId: string
  status: 'pending'
}

type CreateOrderError = 'USER_NOT_FOUND' | 'PRODUCT_OUT_OF_STOCK'
```

---

### sdd-tests-from-spec

Los casos de test se extraen de los ejemplos del spec.

**Spec:**
```markdown
### Ejemplos
- Dado userId válido e items disponibles → retorna orderId con status "pending"
- Dado userId inexistente → error USER_NOT_FOUND
```

**Tests:**
```typescript
it('retorna orderId con status pending dado userId válido', async () => { ... })
it('lanza USER_NOT_FOUND dado userId inexistente', async () => { ... })
```

---

## 5. Nomenclatura (naming-)

### naming-ubiquitous-language

Usa el lenguaje del dominio. Si el negocio dice "Pedido", el código dice `Order`, no `Item`, `Record` o `Data`.

---

### naming-suffix-by-type

Sufijos claros por tipo de artefacto:

| Tipo | Sufijo | Ejemplo |
|------|--------|---------|
| Entidad | `Entity` o sin sufijo | `User`, `OrderEntity` |
| Value Object | `VO` o nombre descriptivo | `EmailVO`, `Money` |
| Comando | `Command` | `CreateUserCommand` |
| Query | `Query` | `GetUserQuery` |
| Handler | `Handler` | `CreateUserHandler` |
| Repositorio | `Repository` | `UserRepository` |
| Evento | `Event` | `UserCreatedEvent` |
| Servicio de dominio | `Service` | `PricingService` |

---

## Estructura de Referencia Completa

```
src/
├── contexts/
│   └── users/
│       ├── domain/
│       │   ├── entities/
│       │   │   └── User.ts
│       │   ├── value-objects/
│       │   │   └── Email.ts
│       │   ├── events/
│       │   │   └── UserCreatedEvent.ts
│       │   └── repositories/
│       │       └── UserRepository.ts        # interface
│       ├── application/
│       │   ├── commands/
│       │   │   ├── CreateUserCommand.ts
│       │   │   └── CreateUserHandler.ts
│       │   └── queries/
│       │       ├── GetUserQuery.ts
│       │       └── GetUserHandler.ts
│       ├── infrastructure/
│       │   └── persistence/
│       │       └── PrismaUserRepository.ts  # implementación
│       └── index.ts                         # API pública del contexto
├── shared-kernel/
│   ├── domain/
│   │   └── UserId.ts
│   └── utils/
│       └── Result.ts
specs/
│   └── create-user.spec.md
└── app/
    └── index.ts                             # DI y bootstrap
```
