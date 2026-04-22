# skillsBase

Base reutilizable para proyectos que van a arrancar con una estructura orientada a DDD y SDD.

## ¿Qué es esto?

Este repositorio sirve como punto de partida para definir la arquitectura base de un sistema: bounded contexts, capas del dominio, contratos de especificación y convenciones para que los agentes trabajen dentro de límites claros.

Los skills siguen existiendo como apoyo, pero el foco principal pasa a ser la estructura base del proyecto y la forma de organizar el trabajo por contexto y por spec.

## Estructura objetivo

```
specs/
├── <feature>.spec.md
├── <feature>.openapi.yaml
└── <feature>.schema.json

src/
├── contexts/
│   └── <context>/
│       ├── domain/
│       ├── application/
│       ├── infrastructure/
│       └── index.ts
├── shared-kernel/
└── app/
```

## Cómo usar esta base

1. Toma `AGENTS.app-template.md` como plantilla para el `AGENTS.md` de un proyecto.
2. Define primero los specs en `specs/` y después implementa el código que los materializa.
3. Organiza el dominio por bounded contexts y evita cruces directos entre ellos.
4. Mantén las dependencias apuntando hacia adentro: infrastructure → application → domain.
5. Documenta los MCPs como herramientas transversales, no como parte del dominio.
6. Usa [docs/mcps.md](docs/mcps.md) como guía para declarar MCPs activos en cada proyecto.

## Qué aporta cada capa

- `domain/`: entidades, value objects, eventos y puertos del dominio.
- `application/`: casos de uso, comandos, queries y orquestación.
- `infrastructure/`: persistencia, HTTP, adaptadores y tecnología concreta.
- `shared-kernel/`: tipos y utilidades compartidas entre contextos.

## Convenciones

- El lenguaje del negocio manda sobre nombres genéricos.
- Los repositorios en `domain/` son interfaces, no implementaciones.
- Los tipos y tests nacen del spec, no al revés.
- Cada contexto expone solo su API pública mediante `index.ts`.

## Referencias

- [Plantilla de proyecto](AGENTS.app-template.md)
- [Guía de arquitectura DDD y SDD](.agents/skills/architecture-patterns/AGENTS.md)
- [Guía de MCPs](docs/mcps.md)
