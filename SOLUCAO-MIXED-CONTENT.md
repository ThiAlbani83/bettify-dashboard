# 🔒 Solução para Mixed Content Error no Vercel

## ❌ Problema Identificado

**Erro**: `Mixed Content: The page at '<URL>' was loaded over HTTPS, but requested an insecure resource '<URL>'`

**Causa**: 
- Vercel serve o site via **HTTPS** (seguro)
- API está em **HTTP** (inseguro) - `http://72.60.49.22:8005`
- Navegadores bloqueiam requisições HTTP de páginas HTTPS

## ✅ Solução Implementada: Proxy Reverso

Criamos um **proxy reverso** no Vercel que:
1. Aceita requisições HTTPS do navegador para `/api/*`
2. Redireciona internamente para `http://72.60.49.22:8005/api/*`
3. Retorna a resposta via HTTPS

### Arquivos Configurados

#### 1. `vercel.json` (NOVO)
```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "http://72.60.49.22:8005/api/:path*"
    }
  ]
}
```

#### 2. `vite.config.js` (Atualizado)
```javascript
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'http://72.60.49.22:8005',
        changeOrigin: true,
        secure: false,
      }
    }
  }
});
```

#### 3. `src/config/api.js` (Atualizado)
```javascript
// Usa caminho relativo - funciona tanto local quanto em produção
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
```

#### 4. `.env` (Atualizado)
```
VITE_API_BASE_URL=
```

## 🚀 Como Fazer Deploy

### Opção A: Push para Git (Recomendado)
```bash
git add .
git commit -m "Fix: Adicionar proxy reverso para resolver Mixed Content"
git push
```

O Vercel detecta automaticamente o `vercel.json` e configura o proxy.

### Opção B: Redeploy Manual
1. Faça commit das mudanças
2. Push para o repositório
3. Vercel fará deploy automático

## 🧪 Como Testar

### Desenvolvimento Local
```bash
npm run dev
```
- Requisições vão para: `/api/messages` → proxy do Vite → `http://72.60.49.22:8005/api/messages`

### Produção (Vercel)
- Navegador faz: `https://seu-app.vercel.app/api/messages` (HTTPS ✅)
- Vercel redireciona: `http://72.60.49.22:8005/api/messages` (HTTP, mas no servidor)
- Resposta volta: HTTPS ✅

## ⚠️ Importante

### **NÃO** precisa configurar variável de ambiente no Vercel!
- O proxy está configurado no `vercel.json`
- Funciona automaticamente após o deploy

### Firewall/Segurança
Se ainda assim não funcionar, verifique se o servidor `72.60.49.22:8005`:
- Está rodando e acessível
- Aceita requisições dos IPs do Vercel
- Tem CORS configurado corretamente

## 📊 Fluxo de Requisição

```
┌─────────────┐  HTTPS   ┌──────────────┐  HTTP   ┌─────────────┐
│  Navegador  │ ────────>│    Vercel    │ ───────>│  API Server │
│   (HTTPS)   │          │    Proxy     │         │    (HTTP)   │
└─────────────┘ <────────└──────────────┘ <───────└─────────────┘
                 HTTPS                      HTTP
```

## 🔍 Troubleshooting

### Ainda recebe Mixed Content Error
1. Confirme que o `vercel.json` foi commitado e está no deploy
2. Verifique nos logs do Vercel se o arquivo foi lido
3. Limpe cache: Settings → Clear Build Cache & Redeploy

### API não responde
1. Teste direto: `curl http://72.60.49.22:8005/api/stats`
2. Verifique firewall do servidor
3. Confirme que aceita requisições externas

### CORS Error
Se aparecer erro de CORS no console, configure no backend:
```javascript
// Adicione no seu servidor da API
app.use(cors({
  origin: ['https://seu-app.vercel.app', 'http://localhost:5173'],
  credentials: true
}));
```

## 🎉 Resultado Final

✅ Site funciona em HTTPS  
✅ Requisições seguras via proxy  
✅ Sem erros de Mixed Content  
✅ Mesma API HTTP (sem precisar SSL)  
