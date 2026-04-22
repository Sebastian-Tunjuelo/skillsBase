# Recomendaciones para buscar CLIs que potencian IA

Los CLI pueden potenciar mucho el trabajo con IA cuando se usan para automatizar tareas repetibles y validaciones rápidas.

## Advertencia

No todos los CLI de la comunidad son seguros o estables. Evalúalos con el checklist de seguridad antes de adoptarlos.

Referencia: [Checklist de seguridad para herramientas comunitarias](seguridad-herramientas-comunitarias.md)

## Qué tipo de CLI priorizar

- CLI con mantenimiento activo y releases frecuentes.
- CLI con documentación clara de permisos y telemetría.
- CLI que permita ejecución no interactiva para CI.
- CLI que no obligue a exponer secretos innecesarios.

## Casos donde sí aportan

- Bootstrap de proyectos y scaffolding.
- Validación local rápida de tests, lint y build.
- Automatización de tareas repetitivas del equipo.

## Casos donde no deben dominar

- Cuando intentan reemplazar decisiones de dominio.
- Cuando fuerzan lock-in sin plan de salida.
- Cuando exigen permisos desproporcionados para su función.

## Criterio práctico

En esta base, los CLI son soporte operativo. La fuente de verdad funcional sigue siendo:

- `specs/` para contratos y comportamiento.
- `src/contexts/` para el diseño del dominio y sus capas.
