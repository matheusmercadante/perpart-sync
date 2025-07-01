import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Index, Unique } from 'typeorm';

@Entity('sync_mapping')
@Unique(['externoId', 'tipoEntidade'])
@Index(['externoId'])
@Index(['internoId'])
export class SyncMapping {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'externo_id', type: 'varchar', length: 255 })
  externoId: string;

  @Column({ name: 'interno_id', type: 'integer' })
  internoId: number;

  @Column({ name: 'tipo_entidade', type: 'varchar', length: 50 })
  tipoEntidade: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}