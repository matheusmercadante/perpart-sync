import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Imovel } from './imovel.entity';

@Entity('ad_imovel_projeto')
export class ImovelProjeto {
  @PrimaryGeneratedColumn({ name: 'numg_imovel_projeto' })
  numgImovelProjeto: number;

  @Column({ name: 'numg_imovel', type: 'integer' })
  numgImovel: number;

  @Column({ name: 'nome_projeto', type: 'varchar', length: 255 })
  nomeProjeto: string;

  @Column({ name: 'numr_testada', type: 'numeric', precision: 10, scale: 2, nullable: true })
  numrTestada: number;

  @Column({ name: 'data_projeto', type: 'date', nullable: true })
  dataProjeto: Date;

  @Column({ name: 'numg_documento_projeto', type: 'integer', nullable: true })
  numgDocumentoProjeto?: number;

  @Column({ name: 'data_aprovacao', type: 'date', nullable: true })
  dataAprovacao?: Date;

  @Column({ name: 'data_validade', type: 'date', nullable: true })
  dataValidade?: Date;

  @Column({ name: 'codg_sequencial_imovel', type: 'varchar', length: 50, nullable: true })
  codgSequencialImovel?: string;

  @Column({ name: 'codg_identificador_projeto', type: 'varchar', length: 50, nullable: true })
  codgIdentificadorProjeto?: string;

  @Column({ name: 'numg_documento_certidao', type: 'integer', nullable: true })
  numgDocumentoCertidao: number;

  @Column({ name: 'numg_documento_habitese', type: 'integer', nullable: true })
  numgDocumentoHabitese: number;

  @Column({ name: 'data_cadastro', type: 'timestamp', nullable: true })
  dataCadastro: Date;

  @Column({ name: 'numg_pessoa_cadastro', type: 'integer', nullable: true })
  numgPessoaCadastro: number;

  @ManyToOne(() => Imovel, imovel => imovel.projetos)
  @JoinColumn({ name: 'numg_imovel' })
  imovel: Imovel;
}