# Prompt Engineering

Guía para escribir prompts efectivos y dividir trabajo en tareas claras para agentes de código e IA.

---

## Los 6 Componentes de un Buen Prompt

Un prompt efectivo siempre responde estas 6 preguntas:

```
1. DIRECCIÓN  → ¿Qué debe hacer y en qué contexto?
2. FORMATO    → ¿Cómo debe estructurarse la respuesta?
3. LÍMITE     → ¿Qué está fuera de alcance?
4. EJEMPLOS   → ¿Cómo se ve un resultado correcto?
5. TAREAS     → ¿Cuáles son los pasos concretos?
6. EVALUACIÓN → ¿Cómo sé que el resultado es correcto?
```

---

## 1. Dirección (context-)

### context-role-and-goal

Define el rol del agente y el objetivo concreto antes de cualquier instrucción.

**Incorrecto:**
```
Refactoriza el código.
```

**Correcto:**
```
Eres un agente de refactorización de TypeScript.
Tu objetivo es migrar el módulo `src/users/` a arquitectura DDD
manteniendo todos los tests existentes en verde.
```

---

### context-provide-relevant-files

Indica explícitamente qué archivos o contexto son relevantes. No asumas que el agente sabe qué leer.

```
Contexto relevante:
- src/users/UserService.ts — archivo a refactorizar
- src/users/UserService.test.ts — tests que deben seguir pasando
- docs/ddd-guide.md — convenciones de arquitectura a seguir
```

---

### context-state-constraints

Declara las restricciones del entorno antes de las instrucciones.

```
Restricciones:
- Node.js 20, TypeScript 5.4
- No agregar nuevas dependencias npm
- Mantener compatibilidad con la API pública existente
```

---

## 2. Formato (prompt-)

### prompt-specify-output-format

Especifica exactamente el formato esperado de la respuesta.

**Ejemplos de formatos:**
```
Formato de respuesta:
- Un archivo por sección de código
- Comentarios explicativos en cada cambio significativo
- Lista de archivos modificados al final
```

```
Formato de respuesta:
- JSON con estructura: { "files": [{ "path": string, "content": string }] }
- Sin texto adicional fuera del JSON
```

---

### prompt-specify-language-and-style

Indica el lenguaje de programación, estilo y convenciones esperadas.

```
- TypeScript estricto (strictNullChecks: true)
- Nombres en inglés, comentarios en español
- Funciones puras donde sea posible
- Sin `any` explícito
```

---

### prompt-length-and-scope

Define el alcance de la respuesta para evitar respuestas demasiado largas o cortas.

```
Alcance:
- Solo modificar archivos dentro de src/users/
- No tocar archivos de configuración
- Máximo 3 archivos nuevos
```

---

## 3. Límite (prompt-)

### prompt-explicit-out-of-scope

Declara explícitamente qué NO debe hacer el agente. Esto es tan importante como decir qué sí debe hacer.

```
Fuera de alcance:
- No modificar la base de datos ni migraciones
- No cambiar la interfaz pública de UserService
- No agregar tests nuevos (solo mantener los existentes)
- No refactorizar archivos fuera de src/users/
```

---

### prompt-no-assumptions

Indica al agente que pregunte antes de asumir cuando algo no está claro.

```
Si encuentras ambigüedad en los requisitos, detente y lista
las preguntas antes de continuar con la implementación.
```

---

## 4. Ejemplos (prompt-)

### prompt-show-dont-tell

Incluye ejemplos concretos de input/output esperado. Un ejemplo vale más que tres párrafos de descripción.

```
Ejemplo de transformación esperada:

ANTES (código actual):
```typescript
class UserService {
  async createUser(email: string, name: string) {
    const user = { id: uuid(), email, name }
    await db.users.insert(user)
    return user
  }
}
```

DESPUÉS (resultado esperado):
```typescript
// domain/entities/User.ts
export class User {
  constructor(
    public readonly id: UserId,
    public readonly email: Email,
    public readonly name: string,
  ) {}
}

// application/commands/CreateUserHandler.ts
export class CreateUserHandler {
  async execute(cmd: CreateUserCommand): Promise<UserId> { ... }
}
```
```

---

### prompt-example-edge-cases

Incluye ejemplos de casos borde o situaciones especiales.

```
Casos especiales a manejar:
- Email duplicado → lanzar DuplicateEmailError (no un error genérico)
- Name vacío → lanzar ValidationError con campo "name"
- Ejemplo: createUser("", "test@test.com") → ValidationError { field: "name" }
```

---

## 5. División en Tareas (tasks-)

### tasks-atomic-and-independent

Divide el trabajo en tareas atómicas. Cada tarea debe poder completarse y verificarse de forma independiente.

**Incorrecto (tarea monolítica):**
```
Tarea 1: Migrar todo el módulo de usuarios a DDD
```

**Correcto (tareas atómicas):**
```
Tarea 1: Crear entidad User con value object Email
  - Archivo: src/contexts/users/domain/entities/User.ts
  - Criterio: User.create("test@test.com") retorna instancia válida

Tarea 2: Crear interfaz UserRepository
  - Archivo: src/contexts/users/domain/repositories/UserRepository.ts
  - Criterio: Solo contiene tipos, sin imports de frameworks

Tarea 3: Implementar PrismaUserRepository
  - Archivo: src/contexts/users/infrastructure/persistence/PrismaUserRepository.ts
  - Criterio: Implementa UserRepository, tests de integración pasan

Tarea 4: Crear CreateUserHandler
  - Archivo: src/contexts/users/application/commands/CreateUserHandler.ts
  - Criterio: Orquesta User.create() + userRepo.save(), sin lógica de negocio propia
```

---

### tasks-ordered-by-dependency

Ordena las tareas respetando dependencias. Una tarea no debe depender de algo que aún no existe.

```
Orden correcto:
1. Tipos y value objects (sin dependencias)
2. Entidades (dependen de value objects)
3. Interfaces de repositorios (dependen de entidades)
4. Casos de uso (dependen de entidades + interfaces)
5. Implementaciones de infraestructura (dependen de interfaces)
6. Tests de integración (dependen de todo lo anterior)
```

---

### tasks-one-file-per-task

Idealmente, cada tarea produce o modifica un archivo. Facilita revisión y rollback.

```
✅ Tarea 1: Crear src/contexts/users/domain/entities/User.ts
✅ Tarea 2: Crear src/contexts/users/domain/value-objects/Email.ts
❌ Tarea 1: Crear todas las entidades del dominio (demasiado amplio)
```

---

### tasks-include-acceptance-criteria

Cada tarea debe tener criterios de aceptación verificables.

```
Tarea: Crear Email value object

Criterios de aceptación:
- Email.create("valid@test.com") → instancia válida
- Email.create("invalid") → lanza InvalidEmailError
- email1.equals(email2) → true si mismo valor
- El valor se normaliza a lowercase
```

---

## 6. Evaluación (eval-)

### eval-define-success

Define explícitamente qué significa "éxito" para la tarea completa.

```
La implementación es correcta cuando:
- Todos los tests existentes siguen en verde (pnpm test)
- No hay errores de TypeScript (pnpm typecheck)
- La estructura de carpetas sigue el patrón DDD definido en docs/architecture.md
- No hay imports cruzados entre contextos
```

---

### eval-checkpoints

Para tareas largas, define checkpoints intermedios de verificación.

```
Checkpoint 1 (después de tareas 1-3):
- pnpm typecheck no reporta errores en src/contexts/users/domain/

Checkpoint 2 (después de tareas 4-5):
- pnpm test src/contexts/users/ pasa

Checkpoint final:
- pnpm test pasa completo
- pnpm build sin errores
```

---

### eval-failure-modes

Describe qué hacer si algo falla.

```
Si un test falla:
1. No continuar con la siguiente tarea
2. Reportar: qué test falló, qué se esperaba, qué se obtuvo
3. Proponer corrección antes de continuar

Si hay ambigüedad en el spec:
1. Listar las interpretaciones posibles
2. Elegir la más conservadora
3. Documentar la decisión en un comentario
```

---

## Plantilla Completa de Prompt

```markdown
## Contexto
Eres un agente de [rol]. El proyecto usa [stack].
Archivos relevantes: [lista de archivos]
Restricciones: [lista de restricciones]

## Objetivo
[Descripción clara de qué debe lograrse]

## Formato de Respuesta
[Cómo debe estructurarse la respuesta]

## Fuera de Alcance
- [cosa 1 que NO debe hacerse]
- [cosa 2 que NO debe hacerse]

## Ejemplo
ANTES: [código/estado actual]
DESPUÉS: [resultado esperado]

## Tareas
1. [tarea atómica con criterio de aceptación]
2. [tarea atómica con criterio de aceptación]
3. [tarea atómica con criterio de aceptación]

## Criterios de Éxito
- [criterio verificable 1]
- [criterio verificable 2]
```

---

## Anti-patrones Frecuentes

| Anti-patrón | Problema | Solución |
|-------------|----------|----------|
| "Mejora el código" | Sin dirección ni criterio | Define qué significa "mejor" |
| Tarea de 10 archivos | Difícil de verificar y revertir | Una tarea = un archivo |
| Sin ejemplos | El agente asume el formato | Siempre incluir un ejemplo |
| Sin límites | El agente modifica demasiado | Declarar explícitamente el scope |
| Criterios subjetivos | "Que quede limpio" | Criterios verificables con comandos |
