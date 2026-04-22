# AGENTS.md

Guía mínima para agentes de código en este repositorio de skills.

## Alcance del Repositorio

- Este workspace mantiene skills dentro de `.agents/skills/`.
- No hay scripts globales en raíz; el trabajo se hace por skill.
- `skills-lock.json` registra skills externas y sus hashes.

## Mapa Rápido

- `.agents/skills/<skill>/SKILL.md`: definición y descripción del skill.
- `.agents/skills/<skill>/README.md`: flujo local y comandos de desarrollo.
- `.agents/skills/<skill>/rules/*.md`: reglas fuente.
- `.agents/skills/<skill>/AGENTS.md`: salida compilada (generada).
- `.agents/skills/<skill>/metadata.json`: metadatos del skill.
- `skills-lock.json`: lock de origen/hash para skills externas.

## Flujo Recomendado

1. Identifica el skill objetivo en `.agents/skills/<skill>/`.
2. Lee primero `SKILL.md` y `README.md` del skill.
3. Si cambias reglas en `rules/`, regenera artefactos del skill.
4. Verifica que cambios de contenido y archivos generados queden sincronizados.

## Comandos (Ejecutar Dentro del Skill)

```bash
pnpm install
pnpm build
pnpm validate
pnpm extract-tests
pnpm dev
```

## Convenciones Importantes

- No trates `AGENTS.md` interno del skill como fuente primaria: se genera desde `rules/`.
- Mantén nombres de reglas con prefijos por área (por ejemplo `async-`, `bundle-`, `server-`, `client-`, `rerender-`, `rendering-`, `js-`, `advanced-`).
- Sigue la plantilla y secciones especiales definidas en cada skill (`rules/_template.md`, `rules/_sections.md` cuando existan).
- Mantén `metadata.json` y `SKILL.md` consistentes (nombre, versión, alcance).

## Pitfalls Frecuentes

- Editar `rules/` sin ejecutar `pnpm build` deja artefactos desactualizados.
- Ejecutar comandos desde raíz fallará o no tendrá efecto útil.
- Cambios en fuentes externas deben reflejarse en `skills-lock.json`.

## Referencias (No Duplicar Contenido)

- Plantilla reutilizable para proyectos de aplicacion:
  - [AGENTS.app-template.md](AGENTS.app-template.md)
- Ejemplo de guía completa de contribución por skill:
  - [.agents/skills/vercel-react-best-practices/README.md](.agents/skills/vercel-react-best-practices/README.md)
- Ejemplo de skill definition:
  - [.agents/skills/vercel-react-best-practices/SKILL.md](.agents/skills/vercel-react-best-practices/SKILL.md)
- Ejemplo de salida compilada:
  - [.agents/skills/vercel-react-best-practices/AGENTS.md](.agents/skills/vercel-react-best-practices/AGENTS.md)
- Guía de arquitectura DDD y SDD:
  - [.agents/skills/architecture-patterns/AGENTS.md](.agents/skills/architecture-patterns/AGENTS.md)
- Guía de prompt engineering y división en tareas:
  - [.agents/skills/prompt-engineering/AGENTS.md](.agents/skills/prompt-engineering/AGENTS.md)
