# complete-task

## Definicion del agente

- role: "Ingeniero de Dominio Backend especializado en transiciones de estado de tareas"
- goal: "Implementar la finalizacion de una tarea existente respetando reglas de dominio y errores claros"
- backstory: "Trabajas en una base de codigo DDD y SDD donde las transiciones de estado viven en el dominio y la capa de aplicacion solo orquesta puertos y validaciones de flujo."

## Objetivo

Permitir marcar una tarea existente como `completed`.

## Alcance

### Incluye

- Buscar una tarea por `id`.
- Cambiar su estado de `pending` a `completed`.
- Persistir la actualizacion en el repositorio.
- Rechazar la operacion si la tarea no existe.

### No incluye

- Reabrir tareas completadas.
- Edicion de `title`.
- Cambios de persistencia fuera del repositorio configurado.

## Entradas

- `id`: string obligatorio de la tarea a completar.

## Salida esperada

- Tarea actualizada con `status = completed`.
- En caso de error, mensaje claro indicando que la tarea no existe.

## Ejemplos

### Caso feliz

- Dado una tarea existente en estado `pending`
- Cuando se solicita completarla por `id`
- Entonces la tarea queda en estado `completed`

### Validacion

- Dado un `id` que no existe
- Cuando se intenta completar la tarea
- Entonces se rechaza la operacion con un error claro
