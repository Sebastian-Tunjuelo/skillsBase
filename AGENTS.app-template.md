# AGENTS.md — Plantilla para Proyectos de Aplicación

> Copia este archivo a la raíz de tu proyecto como `AGENTS.md` y personaliza las secciones marcadas con `TODO`.

---

## Proyecto

**Nombre**: TODO — nombre del proyecto  
**Descripción**: TODO — una línea describiendo qué hace el sistema  
**Stack principal**: TODO — ej. Next.js 14, Rust/Axum, Python, PostgreSQL

---

## Skills Activos

Lista los skills de `.agents/skills/` que aplican a este proyecto:

- `vercel-react-best-practices` — si usas React/Next.js
- `web-design-guidelines` — para componentes UI
- `frontend-design` — patrones de diseño frontend

> Consulta el repositorio de skills para ver todos los disponibles.

---

## Estructura del Proyecto

TODO — describe brevemente los directorios principales y su propósito.

```
/
├── src/          # TODO
├── docs/         # ADRs y documentación técnica
└── ...
```

---

## Convenciones de Código

TODO — adapta según tu stack. Ejemplo:

- **TypeScript**: prettier + eslint, `strictNullChecks` activado
- **Python**: black (line-length 88), ruff, mypy en capas de dominio
- **Rust**: rustfmt default, clippy pedantic
- **Commits**: conventional commits (`feat(scope): mensaje`)
- **Branches**: `feat/`, `fix/`, `docs/`, `refactor/`

---

## Arquitectura y Bounded Contexts

TODO — si el proyecto usa DDD o tiene contextos bien delimitados, descríbelos aquí para que el agente no cruce fronteras.

Ejemplo:
- `contexts/ingestion/` — solo responsable de obtener datos externos
- `contexts/api/` — solo expone HTTP, no contiene lógica de negocio

**Regla**: un agente no modifica código fuera del contexto que le fue asignado.

---

## Comandos Útiles

TODO — lista los comandos más frecuentes del proyecto.

```bash
# Levantar entorno local
make up

# Correr tests
make test

# Lint
make lint

# Build
make build
```

---

## Pitfalls del Proyecto

TODO — documenta aquí los errores frecuentes o decisiones no obvias para que el agente los evite.

Ejemplos:
- No hardcodear secrets — todo va en `.env` (ver `.env.example`)
- No importar entre contextos directamente — usar eventos o shared-kernel
- Los archivos generados (`AGENTS.md` internos, schemas compilados) no se editan a mano

---

## Referencias

- [Repositorio de skills](../) — skills reutilizables disponibles
- `docs/ADRs/` — decisiones de arquitectura del proyecto
