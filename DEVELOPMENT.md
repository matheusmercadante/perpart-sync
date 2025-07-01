# Docker Setup

## Iniciando o banco de dados

1. Certifique-se de que o Docker está instalado e rodando
2. Execute o comando para subir o PostgreSQL com PostGIS:

```bash
docker-compose up -d
```

3. Aguarde o container iniciar (cerca de 15 segundos)
4. Restaure o dump do banco:

```bash
docker exec sync-api-postgres pg_restore -U postgres -d portaisimoveis --no-owner --no-privileges -v /tmp/dump.sql
```

Nota: Alguns erros sobre schemas já existentes são normais e podem ser ignorados.

## Verificando se o banco está rodando

```bash
docker-compose ps
```

## Logs do banco

```bash
docker-compose logs postgres
```

## Conectando ao banco

- Host: localhost
- Port: 5432
- Database: portaisimoveis
- User: postgres
- Password: postgres

## Parando o banco

```bash
docker-compose down
```

## Removendo volumes (apaga todos os dados)

```bash
docker-compose down -v
```