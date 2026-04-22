# Checklist de seguridad para herramientas comunitarias

Usa este checklist antes de adoptar un Skill, MCP o CLI de la comunidad.

## 1. Origen

- Identificaste autor u organización responsable.
- El repositorio tiene actividad reciente y issues atendidos.
- Existe licencia clara de uso.

## 2. Permisos

- Entiendes exactamente qué datos puede leer.
- Entiendes exactamente qué puede modificar.
- Evitaste permisos globales cuando no son necesarios.

## 3. Credenciales y secretos

- No requiere exponer tokens con alcance excesivo.
- Puedes usar credenciales de mínimo privilegio.
- Puedes rotar o revocar acceso sin impacto mayor.

## 4. Riesgo operativo

- Lo probaste primero en entorno aislado.
- Definiste plan de rollback o desactivación.
- Tienes alternativa si el proveedor falla o cambia condiciones.

## 5. Compatibilidad con el repo

- No rompe la separación DDD/SDD del proyecto.
- No introduce dependencias opacas en la capa de dominio.
- Queda documentado en `AGENTS.md` y/o `docs/`.

## Regla final

Si no puedes explicar en una frase qué problema resuelve, qué permisos usa y cómo apagarlo rápido, no lo adoptes todavía.
