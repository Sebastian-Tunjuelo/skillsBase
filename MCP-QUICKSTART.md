# Quick Start: Configurar MCPs

## 30 segundos

### 1. Copiar template de env

```bash
cp .env.example .env.local
```

### 2. Obtener GitHub Token

- Ve a: https://github.com/settings/tokens
- Click "Generate new token (classic)"
- Scopes: `repo`, `read:org`
- Copia el token

### 3. Pegar en .env.local

```bash
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 4. Listo!

Ya puedes usar:

- ✅ **filesystem MCP** - leer/editar archivos
- ✅ **github MCP** - leer issues, PRs, comentarios
- ⏸️ **browser MCP** - deshabilitado, activa si necesitas

---

## Verificación

### Filesystem (sin requisitos)

```bash
# Debería funcionar automáticamente
```

### GitHub (requiere token)

```bash
curl -H "Authorization: Bearer $(cat .env.local | grep GITHUB_TOKEN | cut -d= -f2)" \
  https://api.github.com/user
```

Deberías ver tu información de usuario en JSON.

---

## Activar Browser MCP (opcional)

Si necesitas testing UI:

1. Abre `docs/mcp-manifest.example.yml`
2. Cambia `browser.enabled: false` a `true`
3. Listo

---

## Seguridad

⚠️ **IMPORTANTE:**

- `.env.local` contiene tu token personal
- **NUNCA** lo commits a git
- **NUNCA** lo compartas en chat/mensajes
- Si lo expones, regénéralo en: https://github.com/settings/tokens

---

## Más info

Ver: [docs/mcp-setup.md](docs/mcp-setup.md)
