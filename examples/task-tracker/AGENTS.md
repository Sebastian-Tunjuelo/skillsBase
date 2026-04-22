# AGENTS.md — Task Tracker

## Proyecto

**Nombre**: Task Tracker
**Descripción**: Sistema para registrar y organizar tareas internas con trazabilidad básica.
**Stack principal**: TypeScript, API HTTP, almacenamiento persistente simple

## Estructura Base

```
/
├── specs/
├── src/
│   ├── contexts/
│   │   └── tasks/
│   │       ├── domain/
│   │       │   ├── entities/
│   │       │   ├── value-objects/
│   │       │   └── repositories/
│   │       ├── application/
│   │       │   └── services/
│   │       ├── infrastructure/
│   │       │   └── persistence/
│   │       └── index.ts
│   ├── shared-kernel/
│   └── app/
└── docs/
```

## Arquitectura y Bounded Contexts

El contexto `tasks` concentra la lógica de creación y seguimiento de tareas.

Reglas:

- `domain/` define la tarea y sus reglas.
- `application/` orquesta los casos de uso.
- `infrastructure/` adapta persistencia y transporte.

## SDD

Especificaciones mínimas:

- `specs/create-task.spec.md`
- `specs/list-tasks.spec.md`

Reglas:

- Primero se escribe la spec.
- Luego se implementa el contexto.
- Los tests derivan de los ejemplos del spec.
- Si una tarea o spec es ambigua, el agente pregunta antes de avanzar.

## MCPs y Herramientas

### Propósito

- `filesystem`: editar la estructura del proyecto.
- `github`: revisar cambios, issues y PRs.

### Permisos

- `filesystem`: lectura y escritura en el workspace.
- `github`: lectura de issues, PRs y comentarios; escritura de comentarios.

### Límites

- No modificar secretos ni archivos de entorno sin instrucción explícita.
- No hacer merges ni cambios de estado de PR sin orden expresa.

### Configuración

- Ver `docs/mcp-manifest.yml`.

## Comandos Útiles

```bash
pnpm test
pnpm lint
pnpm build
```

## Pitfalls del Proyecto

- No mezclar reglas de negocio con adaptadores.
- No cruzar imports entre contextos.
- No implementar sin spec previa.
