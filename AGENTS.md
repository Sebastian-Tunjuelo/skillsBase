# AGENTS.md

Guía mínima para agentes de código en esta base de arquitectura DDD y SDD.

## Alcance del Repositorio

- Este workspace define una base para estructurar proyectos por bounded contexts, capas y specs.
- Los skills en `.agents/skills/` quedan como soporte, no como el objetivo central del repositorio.
- `skills-lock.json` sigue registrando skills externas y sus hashes.

## Mapa Rápido

- `specs/`: contratos y especificaciones antes del código.
- `src/contexts/<context>/domain/`: entidades, value objects, eventos y repositorios como interfaces.
- `src/contexts/<context>/application/`: casos de uso y orquestación.
- `src/contexts/<context>/infrastructure/`: implementaciones concretas.
- `src/shared-kernel/`: piezas compartidas entre contextos.
- `AGENTS.app-template.md`: plantilla para copiar a proyectos de aplicación.

## Flujo Recomendado

1. Identifica el contexto o la spec que realmente gobierna el cambio.
2. Lee el spec antes de escribir o mover código.
3. Respeta la dirección de dependencias: infrastructure → application → domain.
4. Si el cambio toca más de un contexto, primero define el contrato entre ellos.

## Convenciones Importantes

- No mezcles lógica de dominio con framework o infraestructura.
- No cruces imports entre contextos salvo a través de shared-kernel o contratos explícitos.
- Usa el lenguaje ubicuo del negocio para nombres de módulos, entidades y comandos.
- Mantén la plantilla y los artefactos generados sincronizados si cambian las reglas.

## Pitfalls Frecuentes

- Implementar primero y especificar después rompe el flujo SDD.
- Hacer que un contexto dependa directamente de otro suele indicar un límite mal definido.
- Poner lógica de negocio en `application/` en vez de `domain/` vuelve frágil el diseño.

## Referencias

- [AGENTS.app-template.md](AGENTS.app-template.md)
- [.agents/skills/architecture-patterns/AGENTS.md](.agents/skills/architecture-patterns/AGENTS.md)
- [docs/mcps.md](docs/mcps.md)
