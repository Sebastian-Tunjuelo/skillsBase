# Cómo decidir entre Skill, MCP o CLI

Esta guía ayuda a elegir la herramienta correcta sin mezclar responsabilidades con el dominio.

## Regla de oro

La herramienta vive fuera del dominio. El dominio se modela en `specs/` y `src/contexts/`; la herramienta solo acelera cómo trabajas.

## Cuándo usar Skill

Usa un Skill cuando necesitas:

- Instrucciones reutilizables para una tarea específica.
- Buenas prácticas empaquetadas para flujo de trabajo del agente.
- Estandarizar cómo se ejecutan tareas repetitivas.

Ejemplos:

- Diseñar prompts de implementación.
- Revisar una interfaz con criterios UX definidos.
- Aplicar una guía de arquitectura en nuevas features.

## Cuándo usar MCP

Usa un MCP cuando necesitas:

- Integrar una capacidad externa desde el agente.
- Leer o escribir en sistemas fuera del código local.
- Automatizar operaciones sobre repositorios, web, archivos u otros servicios.

Ejemplos:

- Operar issues/PRs de GitHub.
- Navegar una app web para validación.
- Consultar documentación externa desde una fuente dedicada.

## Cuándo usar CLI

Usa un CLI cuando necesitas:

- Comandos directos y repetibles en terminal.
- Integración en scripts o pipelines CI/CD.
- Herramientas maduras del ecosistema de tu stack.

Ejemplos:

- Correr linters, tests, builds y generadores.
- Ejecutar scaffolding o validaciones rápidas.
- Operar utilidades de infraestructura en entorno local o CI.

## Matriz rápida

- Skill: conocimiento operativo reutilizable.
- MCP: integración programática de capacidades externas.
- CLI: ejecución de comandos y automatización por terminal.

## Señales de mala elección

- Estás metiendo reglas de negocio dentro de una herramienta.
- Necesitas permisos amplios para una tarea simple.
- El flujo depende de un proveedor sin plan de respaldo.

## Recomendación práctica

Empieza con la opción más simple:

1. CLI local.
2. Skill para estandarizar proceso.
3. MCP cuando realmente necesites integración externa sostenida.
