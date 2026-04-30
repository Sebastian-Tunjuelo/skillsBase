# Ejemplos de Uso: MCPs

## Desde la CLI / Agente

Los MCPs se usan principalmente a través de agentes de código (como GitHub Copilot), pero aquí hay ejemplos de cómo se integran.

---

## 1. Filesystem MCP

### Uso en prompts

```
"Lee el archivo src/contexts/tasks/domain/entities/Task.ts y
 explica la estructura de la entidad Task"
```

El agente usará automáticamente filesystem MCP para:

- Leer el archivo
- Parsear el contenido
- Responder con análisis

### Restricciones

- Solo accede a: `src/`, `specs/`, `docs/`, `examples/`
- NO puede leer: `node_modules/`, `.git/`, archivos `.env`

---

## 2. GitHub MCP

### Requisito Previo

```bash
export GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### Uso en prompts

```
"Obtén los últimos 3 issues abiertos del repositorio y
 resume qué necesitan"
```

El agente usará automáticamente GitHub MCP para:

- Conectar a `https://api.github.com`
- Usar el token de autenticación
- Hacer requests a `/repos/{owner}/{repo}/issues`
- Retornar datos formateados

### Endpoints disponibles

```
GET  /repos/{owner}/{repo}/issues
GET  /repos/{owner}/{repo}/pulls
GET  /repos/{owner}/{repo}/issues/{issue_number}/comments
POST /repos/{owner}/{repo}/issues/{issue_number}/comments
```

### Headers

```
Authorization: Bearer ${GITHUB_TOKEN}
Accept: application/vnd.github.v3+json
```

---

## 3. Browser MCP

### Activar primero

En `docs/mcp-manifest.example.yml`, cambiar:

```yaml
browser:
  enabled: true # <-- Cambiar a true
```

### Uso en prompts

```
"Abre https://localhost:3000, llena el formulario de login
 y captura una screenshot del dashboard"
```

El agente usará automáticamente Browser MCP para:

- Navegar a la URL
- Rellenar campos
- Capturar pantalla
- Retornar imagen

### Acciones soportadas

- `navigate(url)` - navegar a URL
- `screenshot()` - capturar pantalla
- `fill(selector, text)` - llenar campo
- `click(selector)` - hacer clic
- `inspect(selector)` - obtener HTML/propiedades

### Entornos permitidos

- `localhost:3000`
- `localhost:8080`
- `staging.example.com`

No puede navegar a sitios de producción.

---

## Ejemplo Completo: Workflow

### Prompt de usuario

```
"Revisa el último PR abierto, extrae la lista de cambios,
 lee los archivos modificados en src/, y dime si hay
 problemas de arquitectura según el AGENTS.md"
```

### Flujo interno del agente

1. **GitHub MCP** obtiene último PR abierto

   ```
   GET /repos/Sebastian-Tunjuelo/skillsBase/pulls
   ```

2. **GitHub MCP** obtiene lista de archivos en el PR

   ```
   GET /repos/Sebastian-Tunjuelo/skillsBase/pulls/{pr_number}/files
   ```

3. **Filesystem MCP** lee archivos modificados

   ```
   read src/contexts/xyz/application/UseCase.ts
   read src/contexts/xyz/domain/Entity.ts
   ```

4. **Filesystem MCP** lee documentación de arquitectura

   ```
   read AGENTS.md
   read AGENTS.app-template.md
   ```

5. **Agente** analiza todo y retorna insights

---

## Configuración por Perfil

### Perfil `default` (desarrollo normal)

```yaml
profiles:
  default:
    enabled:
      - filesystem
      - github
```

Usar para: revisión de código, exploración de issues, análisis de specs.

### Perfil `ui-review` (testing UI)

```yaml
profiles:
  ui-review:
    enabled:
      - filesystem
      - github
      - browser
```

Usar para: testing UI, validación de flujos, screenshots.

---

## Troubleshooting en Prompts

### "The MCP is not enabled"

- Asegúrate de que el MCP esté `enabled: true` en el manifest
- Verifica que uses el perfil correcto

### "Authentication failed"

- Verifica que `GITHUB_TOKEN` esté configurado
- Comprueba que el token tenga scopes correctos (`repo`, `read:org`)
- Regénéralo si está expirado

### "File not found / Permission denied"

- Verifica que el archivo esté en carpetas permitidas
- Comprueba permisos del SO

### "Browser timeout"

- El timeout máximo es 30 segundos
- Asegúrate de que la URL sea accesible (localhost o staging)

---

## Referencias

- [mcp-manifest.example.yml](docs/mcp-manifest.example.yml) - Configuración completa
- [mcp-setup.md](docs/mcp-setup.md) - Guía de configuración
- [Model Context Protocol Spec](https://spec.modelcontextprotocol.io/)
