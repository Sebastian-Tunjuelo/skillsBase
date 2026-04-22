---
name: architecture-patterns
description: Guías de estructura para proyectos usando DDD (Domain-Driven Design) y SDD (Spec-Driven Development). Aplica cuando se diseña la estructura de carpetas, se definen contextos de dominio, se crean entidades/value objects, o se organiza código por capas. Útil para agentes que generan scaffolding o refactorizan proyectos hacia arquitecturas limpias.
license: MIT
metadata:
  author: local
  version: "1.0.0"
---

# Architecture Patterns — DDD & SDD

Guía de referencia para estructurar proyectos usando Domain-Driven Design (DDD) y Spec-Driven Development (SDD). Cubre estructura de carpetas, capas, bounded contexts y convenciones de nomenclatura.

## Cuándo Aplicar

- Al crear un proyecto nuevo desde cero
- Al refactorizar un proyecto hacia arquitectura limpia
- Cuando un agente necesita saber dónde colocar un archivo nuevo
- Al definir límites entre módulos o contextos

## Categorías de Reglas

| Prioridad | Categoría | Prefijo |
|-----------|-----------|---------|
| 1 | Estructura de Capas | `layers-` |
| 2 | Bounded Contexts | `context-` |
| 3 | Entidades y Value Objects | `domain-` |
| 4 | Spec-Driven Development | `sdd-` |
| 5 | Convenciones de Nomenclatura | `naming-` |

## Guía Rápida

### Estructura DDD Canónica

```
src/
├── contexts/                  # Bounded contexts del dominio
│   └── <context>/
│       ├── domain/            # Entidades, VOs, eventos, repositorios (interfaces)
│       │   ├── entities/
│       │   ├── value-objects/
│       │   ├── events/
│       │   └── repositories/  # Solo interfaces, nunca implementaciones
│       ├── application/       # Casos de uso, comandos, queries
│       │   ├── commands/
│       │   ├── queries/
│       │   └── services/
│       ├── infrastructure/    # Implementaciones concretas (DB, HTTP, etc.)
│       │   ├── persistence/
│       │   └── http/
│       └── index.ts           # Barrel público del contexto
├── shared-kernel/             # Tipos y utilidades compartidas entre contextos
│   ├── domain/
│   └── utils/
└── app/                       # Entry point, DI, configuración
```

### Estructura SDD (Spec-Driven Development)

```
specs/
├── <feature>.spec.md          # Especificación en lenguaje natural
├── <feature>.openapi.yaml     # Contrato de API (si aplica)
└── <feature>.schema.json      # Schema de datos (si aplica)

src/
├── features/
│   └── <feature>/
│       ├── spec.md            # Referencia a specs/
│       ├── types.ts           # Tipos derivados del spec
│       ├── handler.ts         # Implementación
│       └── handler.test.ts    # Tests derivados del spec
```

## Reglas Clave

### Capas (layers-)
- `layers-dependency-direction` — Las dependencias siempre apuntan hacia adentro: infrastructure → application → domain. Nunca al revés.
- `layers-no-framework-in-domain` — La capa domain no importa frameworks (Express, Prisma, React). Solo TypeScript puro.
- `layers-application-orchestrates` — Application solo orquesta, no contiene lógica de negocio.

### Bounded Contexts (context-)
- `context-no-cross-import` — Un contexto no importa directamente de otro. Se comunican por eventos o shared-kernel.
- `context-public-api` — Cada contexto expone solo lo necesario via su `index.ts`.
- `context-single-responsibility` — Un contexto = una responsabilidad de negocio clara.

### Dominio (domain-)
- `domain-entities-have-id` — Toda entidad tiene un identificador único explícito.
- `domain-value-objects-immutable` — Los value objects son inmutables y se comparan por valor, no por referencia.
- `domain-repositories-are-interfaces` — Los repositorios en domain son solo interfaces. La implementación va en infrastructure.

### SDD (sdd-)
- `sdd-spec-before-code` — El spec existe antes que la implementación. El código implementa el spec, no al revés.
- `sdd-types-from-spec` — Los tipos TypeScript se derivan del spec, no se inventan durante la implementación.
- `sdd-tests-from-spec` — Los casos de test se extraen directamente de los ejemplos del spec.

### Nomenclatura (naming-)
- `naming-ubiquitous-language` — Usa el lenguaje del dominio en el código. Si el negocio dice "Pedido", el código dice `Order` o `Pedido`, no `Item` o `Record`.
- `naming-suffix-by-type` — Sufijos claros: `UserEntity`, `EmailVO`, `CreateUserCommand`, `UserRepository`, `UserCreatedEvent`.

## Documento Completo

Ver `AGENTS.md` para la guía expandida con ejemplos de código.
