# Task Tracker

Ejemplo de proyecto consumidor de la base DDD/SDD.

## Qué muestra

- Cómo rellenar `AGENTS.md`.
- Cómo definir specs antes del código.
- Cómo ubicar MCPs como herramientas transversales.
- Cómo usar skills locales en `.agents/skills/`.

## Requisitos

- Node.js 22 o superior.
- `pnpm` instalado globalmente.

## Instalación

```bash
pnpm install
```

## Comandos

```bash
# Validar el proyecto
pnpm build

# Ejecutar las pruebas
pnpm test

# Correr la demo de consola
pnpm demo
```

## Flujo recomendado

1. Leer [AGENTS.md](AGENTS.md) antes de tocar código.
2. Revisar las specs en [specs/](specs/).
3. Revisar el skill local en [.agents/skills/task-tracker-workflow/SKILL.md](.agents/skills/task-tracker-workflow/SKILL.md).
4. Ejecutar `pnpm test` después de cada cambio relevante.

## Skills, MCP y CLI

- Skills: guías reutilizables para ejecutar tareas del agente.
- MCPs: integraciones externas para ampliar capacidades del agente.
- CLI: herramientas de terminal que se instalan y usan directamente por consola.

Los CLI no se consumen como skills o MCP. Se instalan por su propio método (por ejemplo, npm/pnpm/choco/scoop) y luego se invocan con comandos de terminal.

## Estructura

- `AGENTS.md`: guía del proyecto ejemplo.
- `.agents/skills/`: skills locales para orientar implementaciones.
- `specs/`: contratos de comportamiento.
- `src/`: estructura DDD mínima.
- `docs/`: manifiesto de MCPs del ejemplo.
