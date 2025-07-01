import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Imovel } from './imovel.entity';

@Entity('ad_finalidade_uso')
export class FinalidadeUso {
  @PrimaryGeneratedColumn({ name: 'numg_finalidade_uso' })
  numgFinalidadeUso: number;

  @Column({ name: 'nome_finalidade_uso', type: 'varchar', length: 256, nullable: true })
  nomeFinalidadeUso: string;

  @Column({ name: 'desc_finalidade_uso', type: 'varchar', length: 1000, nullable: true })
  descFinalidadeUso: string;

  @OneToMany(() => Imovel, imovel => imovel.finalidadeUso)
  imoveis: Imovel[];
}