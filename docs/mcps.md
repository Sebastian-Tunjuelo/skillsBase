# MCPs en esta base

Esta guía define cómo documentar y usar MCPs en proyectos que nacen desde esta base DDD y SDD.

## Principio

Los MCPs son herramientas transversales. No forman parte del dominio, no viven dentro de un bounded context y no deben mezclar reglas de negocio con capacidades de integración.

## MCPs recomendados

- GitHub: para revisar issues, PRs, comentarios y metadatos del repositorio.
- Filesystem: para leer y modificar archivos del workspace.
- Browser: para validar flujos UI, capturar pantallas o inspeccionar comportamiento web.

## Perfil mínimo

Si un proyecto nace desde esta base, el perfil mínimo recomendado es:

- `filesystem` para lectura y edición local.
- `github` para trabajo con issues, PRs y comentarios.
- `browser` cuando haya UI o validaciones visuales.

## Cómo documentarlos

Para cada MCP activo, deja claro:

1. Qué problema resuelve.
2. Qué datos puede leer o modificar.
3. Qué límites no debe cruzar.
4. Qué secretos o credenciales necesita y dónde se configuran.

## Convención sugerida

Usa una sección fija en `AGENTS.md` del proyecto y un manifiesto separado para la configuración:

- `MCPs y Herramientas`
- `Propósito`
- `Permisos`
- `Límites`
- `Configuración`

Archivo recomendado:

- `docs/mcp-manifest.example.yml`

## Regla de uso

El manifiesto debe dejar claro qué MCPs están activos, en qué contexto se usan y qué permisos mínimos requieren. Si un proyecto no necesita un MCP, no lo declares por defecto.

## Criterio práctico

Si una integración ayuda al agente a trabajar sobre el proyecto pero no describe el negocio, va aquí. Si describe el negocio, pertenece al dominio o a `specs/`.
