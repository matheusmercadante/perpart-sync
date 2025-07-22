-- Script para criar tabela sync_mapping em produção

-- Criar tabela
CREATE TABLE IF NOT EXISTS sync_mapping (
    id SERIAL PRIMARY KEY,
    externo_id VARCHAR(255) NOT NULL,
    interno_id BIGINT NOT NULL,
    tipo_entidade VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_sync_mapping_externo_tipo UNIQUE (externo_id, tipo_entidade)
);

-- Criar índices
CREATE INDEX IF NOT EXISTS idx_sync_mapping_externo_id ON sync_mapping (externo_id);
CREATE INDEX IF NOT EXISTS idx_sync_mapping_interno_id ON sync_mapping (interno_id);

-- Comentar/descomentar conforme necessário
-- Inserir alguns mapeamentos de exemplo
/*
INSERT INTO sync_mapping (externo_id, interno_id, tipo_entidade) 
VALUES 
('EXT_GLEBA_001', 96, 'imovel'),
('EXT_CARTORIO_001', 1, 'cartorio')
ON CONFLICT (externo_id, tipo_entidade) DO NOTHING;
*/

-- Verificar se foi criada
SELECT * FROM sync_mapping;