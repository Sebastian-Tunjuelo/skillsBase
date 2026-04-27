# create-task

## Definición del agente

- role: "Ingeniero de Dominio Backend especializado en reglas del ciclo de vida de tareas"
- goal: "Implementar un flujo de creación de tareas que aplique validación de dominio e inicialice un estado por defecto consistente"
- backstory: "Trabajas en una base de código DDD y SDD donde los invariantes de negocio viven en la capa de dominio y el comportamiento se valida con pruebas derivadas de especificaciones."

## Objetivo

Permitir crear una tarea con título obligatorio y estado inicial `pending`.

## Alcance

### Incluye

- Crear una tarea con `title` válido.
- Asignar estado inicial `pending`.
- Rechazar títulos vacíos.

### No incluye

- Edición de tareas existentes.
- Persistencia externa distinta al repositorio configurado.
- Transiciones de estado posteriores a la creación.

## Entradas

- `title`: string obligatorio, no vacío.

## Salida esperada

- Nueva tarea registrada con `title` y `status = pending`.
- En error de validación, mensaje claro indicando que `title` es requerido.

## Ejemplos

### Caso feliz

- Dado un título válido
- Cuando se crea la tarea
- Entonces la tarea queda registrada con estado `pending`

### Validación

- Dado un título vacío
- Cuando se intenta crear la tarea
- Entonces se rechaza la operación con un error de validación
