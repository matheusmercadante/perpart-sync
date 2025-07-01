# Exemplos para Teste dos Endpoints

## 1. Buscar Gleba - GET /sync/gleba/EXT_GLEBA_001

```bash
curl -X GET "http://localhost:3000/sync/gleba/EXT_GLEBA_001" \
  -H "X-API-Key: chave_secreta_compartilhada_com_sistema1"
```

## 2. Buscar Cartório - GET /sync/cartorio/EXT_CARTORIO_001

```bash
curl -X GET "http://localhost:3000/sync/cartorio/EXT_CARTORIO_001" \
  -H "X-API-Key: chave_secreta_compartilhada_com_sistema1"
```

## 3. Criar Projeto de Engenharia - POST /sync/projeto-engenharia

```bash
curl -X POST "http://localhost:3000/sync/projeto-engenharia" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: chave_secreta_compartilhada_com_sistema1" \
  -d '{
    "externoGlebaId": "EXT_GLEBA_001",
    "projeto": {
      "nomeProjeto": "Loteamento Vila Nova",
      "numrTestada": 25.5,
      "dataProjeto": "2024-12-01",
      "dataAprovacao": "2024-12-15",
      "dataValidade": "2026-12-15",
      "codgSequencialImovel": "SEQ001",
      "codgIdentificadorProjeto": "PROJ001"
    },
    "lotes": [
      {
        "externoLoteId": "EXT_LOTE_001",
        "geometria": "POLYGON((-35.029085 -8.284394, -35.028514 -8.286292, -35.029088 -8.286463, -35.029132 -8.286317, -35.029085 -8.284394))",
        "codgIdentificador": "LOTE001",
        "codgCep": "50000000",
        "descLogradouro": "Rua das Flores",
        "numrEndereco": 123,
        "descBairro": "Centro",
        "descLote": "01",
        "descQuadra": "A",
        "flagEdificado": false,
        "numrPavimento": 0,
        "codgEstadoImovel": "B",
        "codgOcupacao": "D",
        "numrAreaTotal": 300.50,
        "numrAreaConstruida": 0,
        "nomeProprietario": "João Silva",
        "numgFinalidadeUso": 2,
        "numgSituacaoRegularizacao": 2,
        "numgDestinacao": 1
      },
      {
        "externoLoteId": "EXT_LOTE_002",
        "geometria": "POLYGON((-35.029132 -8.286317, -35.029655 -8.286474, -35.029611 -8.286622, -35.030134 -8.286778, -35.029132 -8.286317))",
        "codgIdentificador": "LOTE002",
        "codgCep": "50000000",
        "descLogradouro": "Rua das Flores",
        "numrEndereco": 125,
        "descBairro": "Centro",
        "descLote": "02",
        "descQuadra": "A",
        "flagEdificado": false,
        "numrPavimento": 0,
        "codgEstadoImovel": "B",
        "codgOcupacao": "D",
        "numrAreaTotal": 280.75,
        "numrAreaConstruida": 0,
        "nomeProprietario": "Maria Santos",
        "numgFinalidadeUso": 2,
        "numgSituacaoRegularizacao": 2,
        "numgDestinacao": 1
      }
    ]
  }'
```

## 4. Atualizar Selagem - PATCH /sync/selagem/EXT_LOTE_001

```bash
curl -X PATCH "http://localhost:3000/sync/selagem/EXT_LOTE_001" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: chave_secreta_compartilhada_com_sistema1" \
  -d '{
    "numgFinalidadeUso": 3
  }'
```

## Dados de Referência no Banco

### Glebas Disponíveis:
- Interno ID: 96 → Externo ID: EXT_GLEBA_001 (Proprietário: Perpart)
- Interno ID: 177 (Proprietário: Perpart)

### Cartórios Disponíveis:
- Interno ID: 1 → Externo ID: EXT_CARTORIO_001 (Cartório do 1º Ofício)
- Interno ID: 2 (Cartório de Títulos e Documentos)

### Finalidades de Uso:
- 2: Comercial
- 3: Industrial
- 4: Educacional
- 9: Cultural
- 18: Agrícola

## Observações:

1. **API Key**: Use `chave_secreta_compartilhada_com_sistema1` (já configurada nos exemplos)
2. **Geometrias**: As coordenadas são baseadas na gleba real (ID 96) e estão no formato WKT válido
3. **IDs Externos**: Use prefixos como "EXT_" para facilitar identificação
4. **Sequência de Teste**: 
   - Primeiro teste os GETs (gleba e cartório)
   - Depois o POST (criar projeto) 
   - Por último o PATCH (selagem) usando um dos lotes criados

## Swagger UI

Você também pode testar via interface gráfica em:
http://localhost:3000/api/docs