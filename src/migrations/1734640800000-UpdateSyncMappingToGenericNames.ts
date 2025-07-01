import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateSyncMappingToGenericNames1734640800000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Renomear colunas para nomes mais genéricos
    await queryRunner.query(`ALTER TABLE sync_mapping RENAME COLUMN sistema1_id TO externo_id`);
    await queryRunner.query(`ALTER TABLE sync_mapping RENAME COLUMN sistema2_id TO interno_id`);
    
    // Atualizar índices
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_sync_mapping_sistema1_id"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_sync_mapping_sistema2_id"`);
    await queryRunner.query(`CREATE INDEX "IDX_sync_mapping_externo_id" ON sync_mapping (externo_id)`);
    await queryRunner.query(`CREATE INDEX "IDX_sync_mapping_interno_id" ON sync_mapping (interno_id)`);
    
    // Atualizar constraint única
    await queryRunner.query(`ALTER TABLE sync_mapping DROP CONSTRAINT IF EXISTS "UQ_sync_mapping_sistema1_id_tipo_entidade"`);
    await queryRunner.query(`ALTER TABLE sync_mapping ADD CONSTRAINT "UQ_sync_mapping_externo_id_tipo_entidade" UNIQUE (externo_id, tipo_entidade)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Reverter mudanças
    await queryRunner.query(`ALTER TABLE sync_mapping DROP CONSTRAINT IF EXISTS "UQ_sync_mapping_externo_id_tipo_entidade"`);
    await queryRunner.query(`ALTER TABLE sync_mapping ADD CONSTRAINT "UQ_sync_mapping_sistema1_id_tipo_entidade" UNIQUE (sistema1_id, tipo_entidade)`);
    
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_sync_mapping_externo_id"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_sync_mapping_interno_id"`);
    await queryRunner.query(`CREATE INDEX "IDX_sync_mapping_sistema1_id" ON sync_mapping (sistema1_id)`);
    await queryRunner.query(`CREATE INDEX "IDX_sync_mapping_sistema2_id" ON sync_mapping (sistema2_id)`);
    
    await queryRunner.query(`ALTER TABLE sync_mapping RENAME COLUMN externo_id TO sistema1_id`);
    await queryRunner.query(`ALTER TABLE sync_mapping RENAME COLUMN interno_id TO sistema2_id`);
  }
}