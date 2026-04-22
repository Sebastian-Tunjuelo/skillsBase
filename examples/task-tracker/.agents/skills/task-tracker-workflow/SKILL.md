---
name: task-tracker-workflow
description: Flujo recomendado para implementar cambios en Task Tracker respetando DDD y SDD.
license: MIT
metadata:
  author: local
  version: "1.0.0"
---

# Task Tracker Workflow Skill

Este skill estandariza el flujo para implementar cambios en el ejemplo `task-tracker`.

## Cuándo usarlo

- Al agregar o modificar funcionalidades en el contexto `tasks`.
- Al crear nuevos casos de uso en `application/services`.
- Al ajustar persistencia en `infrastructure/persistence`.

## Flujo recomendado

1. Leer la spec objetivo en `specs/`.
2. Definir o ajustar tipos de dominio en `domain/`.
3. Implementar orquestación en `application/`.
4. Implementar adaptadores concretos en `infrastructure/`.
5. Actualizar pruebas derivadas de la spec.
6. Ejecutar `pnpm test` y `pnpm build`.

## Reglas de arquitectura

- Mantener dependencia hacia adentro: infrastructure -> application -> domain.
- No importar entre contextos de forma directa.
- No mezclar lógica de negocio en infraestructura.

## Criterio de salida

Un cambio se considera listo cuando:

- Cumple el comportamiento definido en `specs/`.
- Mantiene el contexto `tasks` consistente.
- Pasa pruebas y compilación.
