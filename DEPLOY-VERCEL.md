# Instruções de Deploy no Vercel

## Problema Resolvido

O erro "failed to fetch" ocorria porque as URLs da API estavam hardcoded no código. Agora, todas as URLs usam variáveis de ambiente.

## Passos para Configurar no Vercel

### 1. Adicionar Variável de Ambiente no Vercel

1. Acesse seu projeto no Vercel Dashboard
2. Vá em **Settings** → **Environment Variables**
3. Adicione a seguinte variável:
   - **Name**: `VITE_API_BASE_URL`
   - **Value**: `http://72.60.49.22:8005`
   - **Environment**: Marque todas as opções (Production, Preview, Development)

### 2. Fazer Redeploy

Após adicionar a variável de ambiente:

1. Vá na aba **Deployments**
2. Clique nos 3 pontos do último deploy
3. Selecione **Redeploy**
4. Confirme o redeploy

### 3. Verificar o Build

O Vercel irá:

- Instalar as dependências
- Carregar a variável de ambiente `VITE_API_BASE_URL`
- Fazer o build do projeto com Vite
- Substituir automaticamente `import.meta.env.VITE_API_BASE_URL` pelo valor configurado

## Estrutura de Arquivos Criados

```
dashboard-finance/
├── .env                        # Arquivo local (não commitar)
├── .env.example               # Exemplo para outros desenvolvedores
└── src/
    └── config/
        └── api.js            # Configuração centralizada da API
```

## Como Funciona

- **Desenvolvimento Local**: O Vite lê o arquivo `.env` e injeta o valor em `import.meta.env.VITE_API_BASE_URL`
- **Produção (Vercel)**: O Vercel injeta o valor da variável de ambiente configurada no dashboard

## Importante

⚠️ **NÃO commite o arquivo `.env`** no Git!

Adicione ao `.gitignore`:

```
.env
.env.local
```

O arquivo `.env.example` pode ser commitado para documentação.

## Testando Localmente

1. Certifique-se que o arquivo `.env` existe na raiz do projeto
2. Execute: `npm run dev`
3. O aplicativo deve conectar com a API configurada

## Troubleshooting

### Ainda recebo "failed to fetch" no Vercel

1. Verifique se a variável de ambiente foi salva corretamente
2. Confirme que o nome é exatamente `VITE_API_BASE_URL` (case-sensitive)
3. Faça um redeploy completo
4. Limpe o cache do Vercel (Settings → General → Clear Build Cache & Redeploy)

### API não está acessível

- Confirme que o servidor `http://72.60.49.22:8005` está rodando
- Verifique se há firewall bloqueando requisições do Vercel
- Teste a URL da API no navegador

### Problemas de CORS

Se aparecer erro de CORS, você precisa configurar o servidor da API para aceitar requisições do domínio do Vercel:

- Adicione o domínio do Vercel (ex: `https://seu-projeto.vercel.app`) nos headers CORS do backend
