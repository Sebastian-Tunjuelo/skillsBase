# Task Tracker

Ejemplo de proyecto consumidor de la base DDD/SDD.

## Qué muestra

- Cómo rellenar `AGENTS.md`.
- Cómo definir specs antes del código.
- Cómo ubicar MCPs como herramientas transversales.

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
3. Ejecutar `pnpm test` después de cada cambio relevante.

## Estructura

- `AGENTS.md`: guía del proyecto ejemplo.
- `specs/`: contratos de comportamiento.
- `src/`: estructura DDD mínima.
- `docs/`: manifiesto de MCPs del ejemplo.
