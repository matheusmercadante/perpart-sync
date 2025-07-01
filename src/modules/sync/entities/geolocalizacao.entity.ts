import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Imovel } from './imovel.entity';

@Entity('ad_geolocalizacao')
export class Geolocalizacao {
  @PrimaryGeneratedColumn({ name: 'numg_geolocalizacao' })
  numgGeolocalizacao: number;

  @Column({ name: 'numg_imovel', type: 'bigint', nullable: true })
  numgImovel: number;

  @Column({
    name: 'desc_geometria',
    type: 'geometry',
    spatialFeatureType: 'Geometry',
    srid: 4326
  })
  descGeometria: string;

  @Column({ name: 'desc_tipo', type: 'varchar', length: 50, nullable: true })
  descTipo: string;

  @Column({ name: 'desc_propriedade', type: 'json', nullable: true })
  descPropriedade: any;

  @Column({ name: 'data_cadastro', type: 'timestamp', nullable: true })
  dataCadastro: Date;

  @Column({ name: 'numg_pessoa_cadastro', type: 'integer', nullable: true })
  numgPessoaCadastro: number;

  @Column({ name: 'data_atualizacao', type: 'timestamp', nullable: true })
  dataAtualizacao: Date;

  @Column({ name: 'numg_pessoa_atualizacao', type: 'integer', nullable: true })
  numgPessoaAtualizacao: number;

  @Column({ name: 'data_exclusao', type: 'timestamp', nullable: true })
  dataExclusao: Date;

  @Column({ name: 'numg_pessoa_exclusao', type: 'integer', nullable: true })
  numgPessoaExclusao: number;

  @Column({ name: 'numg_regiao', type: 'integer', nullable: true })
  numgRegiao: number;

  @Column({ name: 'numg_macro_regiao', type: 'integer', nullable: true })
  numgMacroRegiao: number;

  @Column({ name: 'numg_cartorio', type: 'integer', nullable: true })
  numgCartorio: number;

  @Column({ name: 'numg_municipio', type: 'integer', nullable: true })
  numgMunicipio: number;

  @Column({ name: 'calculated_area', type: 'double precision', nullable: true })
  calculatedArea: number;

  @ManyToOne(() => Imovel, imovel => imovel.geolocalizacoes)
  @JoinColumn({ name: 'numg_imovel' })
  imovel: Imovel;
}