import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class CreateSyncMapping1750356342704 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "sync_mapping",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "sistema1_id",
                        type: "varchar",
                        length: "255",
                    },
                    {
                        name: "sistema2_id",
                        type: "bigint",
                    },
                    {
                        name: "tipo_entidade",
                        type: "varchar",
                        length: "50",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                        onUpdate: "CURRENT_TIMESTAMP",
                    },
                ],
            }),
            true
        );

        await queryRunner.createIndex(
            "sync_mapping",
            new TableIndex({
                name: "UQ_sync_mapping_sistema1_tipo",
                columnNames: ["sistema1_id", "tipo_entidade"],
                isUnique: true,
            })
        );

        await queryRunner.createIndex(
            "sync_mapping",
            new TableIndex({
                name: "IDX_sync_mapping_sistema2_id",
                columnNames: ["sistema2_id"],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex("sync_mapping", "IDX_sync_mapping_sistema2_id");
        await queryRunner.dropIndex("sync_mapping", "UQ_sync_mapping_sistema1_tipo");
        await queryRunner.dropTable("sync_mapping");
    }

}
