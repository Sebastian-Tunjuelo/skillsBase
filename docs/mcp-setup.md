# Configuración de MCPs (Model Context Protocol)

## Resumen

Este documento explica cómo configurar y usar los MCPs definidos en `mcp-manifest.example.yml`.

---

## 1. FILESYSTEM MCP

### Descripción

Lee y modifica archivos dentro del workspace de forma segura.

### Configuración

```yaml
filesystem:
  enabled: true
  type: local-workspace
  config:
    workspacePath: ${WORKSPACE_ROOT}
    allowedDirs:
      - src
      - specs
      - docs
      - examples
    blockedDirs:
      - node_modules
      - dist
      - .git
      - .env*
```

### Uso

- ✅ Leer archivos en carpetas permitidas
- ✅ Crear y editar código
- ✅ Modificar documentación
- ❌ No toca `node_modules`, `.git`, ni archivos `.env`

### Requisitos

Ninguno. Funciona con permisos de archivo del sistema operativo.

---

## 2. GITHUB MCP

### Descripción

Se conecta a la API de GitHub para leer/escribir issues, PRs y comentarios.

### Configuración

```yaml
github:
  enabled: true
  type: github
  config:
    apiBaseUrl: "https://api.github.com"
    apiVersion: "2022-11-28"
    authentication:
      type: "bearer"
      tokenEnvVar: "GITHUB_TOKEN"
    repository:
      owner: "${REPO_OWNER}"
      name: "${REPO_NAME}"
    rateLimit:
      requests: 5000
      resetWindow: 3600
```

### Requisitos

**Variable de Entorno: `GITHUB_TOKEN`**

#### Cómo obtener un token:

1. Ve a https://github.com/settings/tokens
2. Haz clic en "Generate new token (classic)"
3. Selecciona estos scopes:
   - `repo` (acceso completo a repositorios privados y públicos)
   - `read:org` (leer metadatos de organizaciones)
4. Copia el token generado
5. Guárdalo en un archivo `.env.local`:
   ```
   GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

#### Límites

- 5000 requests por hora
- No hacer merges sin instrucción explícita
- No publicar credenciales en comentarios

### Uso

- ✅ Leer issues y PRs
- ✅ Leer comentarios de review
- ✅ Escribir comentarios
- ❌ Cambiar estado de PRs (a menos que se indique)
- ❌ Hacer merges automáticos

---

## 3. BROWSER MCP

### Descripción

Automatiza acciones en navegador: navegar, hacer screenshots, llenar formularios, inspeccionar DOM.

### Configuración

```yaml
browser:
  enabled: false # Deshabilitado por defecto
  type: browser-automation
  config:
    browser:
      type: "chromium"
      headless: true
      viewport:
        width: 1280
        height: 720
    timeout:
      navigation: 30000 # 30 segundos máximo
      action: 5000 # 5 segundos por acción
      screenshot: 2000 # 2 segundos para capturar
    testEnvironments:
      - localhost:3000
      - localhost:8080
      - staging.example.com
```

### Requisitos

- Instalar Chromium/Playwright (automático en muchos entornos)
- Entorno de testing (no producción)

### Uso

- ✅ Navegar a URLs en entornos de test
- ✅ Capturar pantallas
- ✅ Llenar formularios
- ✅ Inspeccionar el DOM
- ❌ No usar con URLs de producción o credenciales reales
- ❌ No capturar datos personales

---

## Configuración del Archivo .env.local

Crea un archivo `.env.local` en la raíz del proyecto:

```bash
# .env.local (NUNCA commitear este archivo)

# Requerido: Token de GitHub
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Opcional: Autodetectado desde git origin, pero puedes especificar
REPO_OWNER=Sebastian-Tunjuelo
REPO_NAME=skillsBase
WORKSPACE_ROOT=/Users/usuario/Desktop/skillsBase
```

### Seguridad

⚠️ **IMPORTANTE:**

- **NUNCA** hagas commit de `.env.local`
- Asegúrate de que `.gitignore` incluya `*.env.local`
- Si expones un token, regénéralo inmediatamente en GitHub
- Los tokens son personales y no reutilizables

---

## Verificación de Configuración

### Filesystem

```bash
# No requiere verificación especial
# Simplemente intenta leer un archivo:
mcp test filesystem --path src/
```

### GitHub

```bash
# Verifica que el token sea válido
curl -H "Authorization: Bearer ${GITHUB_TOKEN}" \
  https://api.github.com/user

# Deberías ver tu información de usuario
```

### Browser

```bash
# Activa primero en el manifest (enabled: true)
# Luego prueba:
mcp test browser --url https://example.com
```

---

## Configuración por Perfil

El manifiesto soporta perfiles para diferentes usos:

### Perfil `default`

```yaml
profiles:
  default:
    enabled:
      - filesystem
      - github
```

Usa esto para desarrollo normal.

### Perfil `ui-review`

```yaml
profiles:
  ui-review:
    enabled:
      - filesystem
      - github
      - browser
```

Activa solo si necesitas testing UI.

**Cambiar perfil:**

```bash
mcp use-profile ui-review
```

---

## Troubleshooting

### "Token de GitHub expirado"

- Regénera el token: https://github.com/settings/tokens
- Actualiza `.env.local`

### "Rate limit exceeded"

- GitHub MCP tiene límite de 5000 requests/hora
- Espera 1 hora antes de intentar de nuevo
- O pide un token con más privilegios

### "Browser timeout"

- Aumenta los valores en `timeout.navigation` y `timeout.action`
- Asegúrate de que el sitio esté accesible (localhost u staging)

### "Permission denied on file system"

- Verifica que el archivo/carpeta esté en `allowedDirs`
- Comprueba permisos de lectura/escritura del SO

---

## Lectura Adicional

- [GitHub API Documentation](https://docs.github.com/en/rest)
- [Model Context Protocol Spec](https://spec.modelcontextprotocol.io/)
- [Playwright Documentation](https://playwright.dev/) (para browser MCP)
