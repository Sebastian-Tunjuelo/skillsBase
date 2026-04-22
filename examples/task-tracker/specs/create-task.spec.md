# create-task

## Objetivo

Permitir crear una tarea con título obligatorio y estado inicial `pending`.

## Ejemplos

### Caso feliz

- Dado un título válido
- Cuando se crea la tarea
- Entonces la tarea queda registrada con estado `pending`

### Validación

- Dado un título vacío
- Cuando se intenta crear la tarea
- Entonces se rechaza la operación con un error de validación
