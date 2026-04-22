# AGENTS.md — Plantilla para Proyectos con DDD y SDD

> Copia este archivo a la raíz de tu proyecto como `AGENTS.md` y completa las secciones marcadas con `TODO`.

---

## Proyecto

**Nombre**: TODO — nombre del proyecto  
**Descripción**: TODO — una línea describiendo qué problema resuelve  
**Stack principal**: TODO — ej. Next.js 14, Rust/Axum, Python, PostgreSQL

---

## Estructura Base

TODO — describe brevemente los directorios principales y su propósito.

```
/
├── specs/        # Especificaciones, contratos y schemas
├── src/
│   ├── contexts/
│   │   └── <context>/
│   │       ├── domain/
│   │       ├── application/
│   │       ├── infrastructure/
│   │       └── index.ts
│   ├── shared-kernel/
│   └── app/
└── docs/         # ADRs, decisiones y notas de arquitectura
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

TODO — define los contextos del dominio y el límite de responsabilidad de cada uno.

Ejemplo:

- `contexts/ingestion/` — solo obtiene datos externos y los traduce al dominio
- `contexts/api/` — expone HTTP y delega la lógica en application/domain

**Regla**: un contexto no cruza a otro directamente; si necesita colaborar, usa contratos, eventos o shared-kernel.

---

## SDD

TODO — describe cómo se escriben y versionan los specs en este proyecto.

Reglas mínimas:

- El spec va antes que la implementación.
- Los tests críticos nacen de ejemplos del spec.
- Los cambios de contrato se revisan antes de tocar la lógica interna.
- Si una tarea, spec o requerimiento es ambiguo, el agente debe preguntar antes de asumir.

---

## MCPs y Herramientas

TODO — lista los MCPs que el proyecto permite usar y para qué sirven.

Recomendación:

- Mantén los MCPs fuera del dominio: son herramientas de trabajo, no parte del negocio.
- Documenta en esta sección qué puede usar el agente, con qué propósito y qué datos no debe tocar.
- Si un MCP requiere configuración sensible, guárdala fuera del código y referencia el archivo de configuración en `docs/`.

Referencia: usa [docs/mcps.md](docs/mcps.md) como guía base para redactar esta sección.

Ejemplo:

- `github` — revisar issues, PRs y comentarios.
- `filesystem` — leer y modificar archivos del workspace.
- `browser` — validar flujos o UI cuando aplique.

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

- [Base del repositorio](../README.md)
- [Guía de arquitectura DDD y SDD](.agents/skills/architecture-patterns/AGENTS.md)
