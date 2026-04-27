# task

## Propósito

Definir una tarea de forma clara, atómica y verificable para que cualquier agente o persona pueda ejecutarla sin ambigüedad.

## Identidad del agente

Usar siempre este esquema:

- `role`: perfil con especialidad concreta.
- `goal`: resultado operativo que debe lograr el agente.
- `backstory`: experiencia y contexto que guían su criterio de ejecución.

### Formato recomendado

```yaml
agent:
	role: "Investigador UX Senior especializado en análisis de entrevistas con usuarios"
	goal: "Sintetizar hallazgos de entrevistas en recomendaciones UX claras, priorizadas por impacto y esfuerzo"
	backstory: "Has liderado programas de investigación de métodos mixtos en equipos de producto y eres reconocido por convertir insights cualitativos en decisiones concretas de roadmap."
```

### Ejemplos de role

- "Investigador UX Senior especializado en análisis de entrevistas con usuarios"
- "Arquitecto de Software Full-Stack con experiencia en sistemas distribuidos"
- "Director de Comunicaciones Corporativas especializado en gestión de crisis"

### Ejemplo completo de definición de agente

```yaml
agent:
	role: "Estratega de Contenido Tecnológico B2B"
	goal: "Crear contenido convincente y técnicamente preciso que explique temas complejos en lenguaje accesible, impulsando la participación de lectores y apoyando objetivos de negocio"
	backstory: "Has dedicado una década a crear contenido para empresas tecnológicas líderes, especializándote en traducir conceptos técnicos para audiencias de negocio. Destacas en investigación, entrevistas con expertos y estructuración de información para maximizar claridad e impacto. Crees que el mejor contenido B2B educa primero y vende después, construyendo confianza mediante experiencia real y no por hype de marketing."
```

## Objetivo

- Resultado de negocio o técnico que se debe lograr.
- Debe ser único por tarea.

## Alcance

### Incluye

- Qué sí se hará.

### No incluye

- Qué queda fuera para evitar expansión de alcance.

## Entradas

- Especificar información de entrada si aplica.
- Ejemplos: título de tarea, estado inicial, parámetros, dependencias, archivos afectados.

## Proceso sugerido

1. Leer el spec principal y confirmar criterios.
2. Ejecutar la implementación mínima que cumpla el objetivo.
3. Validar con pruebas o checks definidos.
4. Documentar salida y decisiones.

## Salida esperada

- Entregable concreto y verificable.
- Ejemplos: tarea creada en repositorio, respuesta de API, archivo actualizado, pruebas pasando.
- Si aplica, definir formato de salida (JSON, texto, tabla, diff, etc.).

## Ejemplos

### Caso feliz

- Dado una entrada válida
- Cuando se ejecuta la tarea
- Entonces se obtiene la salida esperada

### Validación

- Dado una entrada inválida o incompleta
- Cuando se ejecuta la tarea
- Entonces se rechaza con error claro y accionable

## Criterios de calidad (evaluación)

- Claridad: la tarea se entiende sin contexto adicional.
- Atomicidad: resuelve un solo propósito.
- Trazabilidad: se puede mapear a un spec o necesidad de negocio.
- Verificabilidad: existe forma objetiva de validar el resultado.

## Regla de división de tareas

- Si la tarea tiene más de un objetivo principal, dividirla.
- Si requiere múltiples entregables no acoplados, dividirla.
- Si no puede validarse en una sola revisión razonable, dividirla.

## Plantilla mínima reutilizable

Completar estos campos para cada tarea nueva:

- role:
- goal:
- backstory:
- Objetivo:
- Incluye:
- No incluye:
- Entradas:
- Salida esperada:
- Caso feliz:
- Validación:
- Criterios de calidad:

## Ejemplo aplicado (create-task)

### Definición del agente

- role: "Ingeniero de Dominio Backend especializado en reglas del ciclo de vida de tareas"
- goal: "Implementar un flujo de creación de tareas que aplique validación de dominio e inicialice un estado por defecto consistente"
- backstory: "Trabajas en una base de código DDD y SDD donde los invariantes de negocio viven en la capa de dominio y el comportamiento se valida con pruebas derivadas de especificaciones."

### Objetivo

- Permitir crear una tarea con título obligatorio y estado inicial `pending`.

### Entradas

- title: string obligatorio, no vacío.

### Salida esperada

- Tarea creada con `title` y `status = pending`.

### Caso feliz

- Dado un título válido
- Cuando se crea la tarea
- Entonces la tarea queda registrada con estado `pending`

### Validación

- Dado un título vacío
- Cuando se intenta crear la tarea
- Entonces se rechaza la operación con un error de validación
