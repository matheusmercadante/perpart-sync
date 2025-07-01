# Instruções de Deploy em Produção

## Pré-requisitos
- Docker já instalado na VM
- PostgreSQL com PostGIS já rodando na VM
- Acesso SSH à VM

## Passos para Deploy

### 1. Preparar o código localmente

```bash
# Criar arquivo .env.production com as configurações da VM
cp .env.example .env.production
# Editar com as credenciais reais do banco de produção
```

### 2. Fazer build da imagem Docker

```bash
# Build da imagem
docker build -t sync-api:latest .

# Ou se preferir, fazer o build direto na VM
```

### 3. Transferir para o servidor

**Opção A: Via Docker Export/Import**
```bash
# Salvar a imagem
docker save sync-api:latest | gzip > sync-api.tar.gz

# Transferir para o servidor
scp -P 7654 sync-api.tar.gz perpart.upe@10.238.114.39:/home/perpart.upe/

# Conectar no servidor e carregar a imagem
ssh perpart.upe@10.238.114.39 -p 7654
docker load < sync-api.tar.gz
rm sync-api.tar.gz  # remover arquivo após carregar
```

**Opção B: Build direto no servidor (recomendado)**
```bash
# Transferir código fonte
scp -P 7654 -r . perpart.upe@10.238.114.39:/home/perpart.upe/sync-api/

# Conectar no servidor
ssh perpart.upe@10.238.114.39 -p 7654

# Entrar na pasta e fazer build
cd sync-api
docker build -t sync-api:latest .
```

### 4. Executar na VM

```bash
# Criar arquivo .env na VM com as configurações
cat > .env << EOF
DATABASE_URL=postgresql://usuario:senha@localhost:5432/portaisimoveis
SYNC_API_KEY=sua_chave_secreta_aqui
PORT=3000
NODE_ENV=production
EOF

# Executar o container
docker run -d \
  --name sync-api \
  --restart unless-stopped \
  --network host \
  --env-file .env \
  -v $(pwd)/logs:/app/logs \
  sync-api:latest
```

### 5. Alternativa: Docker Compose simplificado

Criar arquivo `docker-compose.yml` na VM:

```yaml
version: '3.8'

services:
  sync-api:
    image: sync-api:latest
    container_name: sync-api
    restart: unless-stopped
    network_mode: host
    env_file:
      - .env
    volumes:
      - ./logs:/app/logs
```

Executar:
```bash
docker-compose up -d
```

### 6. Verificar logs

```bash
# Ver logs do container
docker logs sync-api

# Seguir logs em tempo real
docker logs -f sync-api
```

### 7. Testar a API

```bash
# Testar health check (adicionar endpoint se necessário)
curl http://localhost:3000/

# Testar endpoint com API key
curl -H "X-API-Key: sua_chave_secreta" http://10.238.114.39:3000/sync/gleba/EXT_GLEBA_001
```

## Configurações importantes do .env

```bash
# Conexão com banco local da VM (usando localhost ou IP interno)
DATABASE_URL=postgresql://postgres:senha@localhost:5432/portaisimoveis

# API Key forte para produção
SYNC_API_KEY=gerar_uma_chave_segura_aqui

# Porta (verificar se 3000 está disponível)
PORT=3000

# Ambiente
NODE_ENV=production
```

## Dicas de Segurança

1. **Firewall**: Configurar para aceitar apenas conexões necessárias na porta 3000
2. **Reverse Proxy**: Considerar usar Nginx como reverse proxy com HTTPS
3. **API Key**: Usar uma chave forte e única para produção
4. **Logs**: Configurar rotação de logs para não encher o disco

## Comandos úteis

```bash
# Parar o container
docker stop sync-api

# Remover o container
docker rm sync-api

# Ver status
docker ps

# Entrar no container
docker exec -it sync-api sh

# Ver uso de recursos
docker stats sync-api
```