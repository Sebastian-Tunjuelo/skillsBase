---
name: prompt-engineering
description: Guía para escribir prompts efectivos para agentes de código e IA. Aplica cuando se diseñan instrucciones para agentes, se crean specs de features, se definen tareas para LLMs, o se estructura cualquier prompt complejo. Cubre los 6 componentes de un buen prompt y cómo dividir trabajo en tareas atómicas.
license: MIT
metadata:
  author: local
  version: "1.0.0"
---

# Prompt Engineering

Guía para escribir prompts efectivos y dividir trabajo en tareas claras para agentes de código e IA.

## Cuándo Aplicar

- Al escribir instrucciones para un agente (AGENTS.md, steering files, specs)
- Al crear una tarea para un LLM o agente de código
- Al diseñar un flujo de trabajo automatizado
- Al revisar por qué un agente no está produciendo el resultado esperado

## Los 6 Componentes de un Buen Prompt

| # | Componente | Pregunta que responde |
|---|------------|----------------------|
| 1 | **Dirección** | ¿Qué debe hacer y en qué contexto? |
| 2 | **Formato** | ¿Cómo debe estructurarse la respuesta? |
| 3 | **Límite** | ¿Qué está fuera de alcance? |
| 4 | **Ejemplos** | ¿Cómo se ve un resultado correcto? |
| 5 | **Tareas** | ¿Cuáles son los pasos concretos? |
| 6 | **Evaluación** | ¿Cómo sé que el resultado es correcto? |

## Categorías de Reglas

| Prioridad | Categoría | Prefijo |
|-----------|-----------|---------|
| 1 | Estructura del Prompt | `prompt-` |
| 2 | División en Tareas | `tasks-` |
| 3 | Contexto y Dirección | `context-` |
| 4 | Evaluación y Calidad | `eval-` |

## Documento Completo

Ver `AGENTS.md` para la guía expandida con plantillas y ejemplos.
