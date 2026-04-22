# agent-skills

Base reutilizable de skills para proyectos desarrollados con apoyo de IA.

## ¿Qué es esto?

Un repositorio centralizado de skills que los agentes de código pueden consumir en cualquier proyecto. Cada skill encapsula un conjunto de reglas, convenciones y buenas prácticas para un dominio específico (React, diseño web, bases de datos, etc.).

## Estructura

```
.agents/skills/<skill>/
├── SKILL.md          # Definición, propósito y alcance del skill
├── README.md         # Flujo de desarrollo y comandos locales
├── rules/*.md        # Reglas fuente (fuente de verdad)
├── AGENTS.md         # Salida compilada — NO editar directamente
└── metadata.json     # Nombre, versión, alcance
```

## Cómo consumir skills en un proyecto

1. Copia `AGENTS.app-template.md` a la raíz de tu proyecto como `AGENTS.md`
2. Referencia los skills que necesitas desde `skills-lock.json`
3. El agente leerá `AGENTS.md` al iniciar y sabrá qué reglas aplicar

## Skills disponibles

| Skill | Descripción |
|---|---|
| `vercel-react-best-practices` | Buenas prácticas de React/Next.js (Vercel) |
| `web-design-guidelines` | Guías de diseño web |
| `frontend-design` | Patrones de diseño frontend |
| `agent-browser` | Navegación web para agentes |
| `find-skills` | Descubrimiento de skills disponibles |

## Agregar un nuevo skill

1. Crea la carpeta `.agents/skills/<nombre-skill>/`
2. Define `SKILL.md`, `metadata.json` y las reglas en `rules/`
3. Ejecuta `pnpm build` dentro del skill para generar `AGENTS.md`
4. Registra el skill en `skills-lock.json` si es externo

## Convenciones

- Los prefijos de reglas indican área: `async-`, `bundle-`, `client-`, `server-`, `js-`, `rendering-`, `advanced-`
- `AGENTS.md` dentro de cada skill se genera — nunca editar a mano
- Comandos siempre se ejecutan dentro del directorio del skill, no desde la raíz
