import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Municipio } from './municipio.entity';
import { Cartorio } from './cartorio.entity';
import { FinalidadeUso } from './finalidade-uso.entity';
import { Geolocalizacao } from './geolocalizacao.entity';
import { ImovelProjeto } from './imovel-projeto.entity';

@Entity('ad_imovel')
export class Imovel {
  @PrimaryGeneratedColumn({ name: 'numg_imovel' })
  numgImovel: number;

  @Column({ name: 'numg_imovel_origem', type: 'bigint', nullable: true })
  numgImovelOrigem: number;

  @Column({ name: 'codg_identificador', type: 'varchar', length: 50, nullable: true })
  codgIdentificador: string;

  @Column({ name: 'codg_latitude', type: 'varchar', length: 50, nullable: true })
  codgLatitude: string;

  @Column({ name: 'codg_longitude', type: 'varchar', length: 50, nullable: true })
  codgLongitude: string;

  @Column({ name: 'codg_cep', type: 'varchar', length: 8, nullable: true })
  codgCep: string;

  @Column({ name: 'desc_logradouro', type: 'varchar', length: 256, nullable: true })
  descLogradouro: string;

  @Column({ name: 'numr_endereco', type: 'integer', nullable: true })
  numrEndereco: number;

  @Column({ name: 'desc_bairro', type: 'varchar', length: 256, nullable: true })
  descBairro: string;

  @Column({ name: 'desc_lote', type: 'varchar', length: 50, nullable: true })
  descLote: string;

  @Column({ name: 'desc_quadra', type: 'varchar', length: 50, nullable: true })
  descQuadra: string;

  @Column({ name: 'numg_municipio', type: 'integer', nullable: true })
  numgMunicipio: number;

  @Column({ name: 'codg_zoneamento', type: 'char', length: 1, nullable: true })
  codgZoneamento: string;

  @Column({ name: 'codg_area_interesse', type: 'char', length: 1, nullable: true })
  codgAreaInteresse: string;

  @Column({ name: 'numg_finalidade_uso', type: 'integer', nullable: true })
  numgFinalidadeUso: number;

  @Column({ name: 'flag_edificado', type: 'boolean', nullable: true })
  flagEdificado: boolean;

  @Column({ name: 'numr_pavimento', type: 'integer', nullable: true })
  numrPavimento: number;

  @Column({ name: 'codg_estado_imovel', type: 'char', length: 1, nullable: true })
  codgEstadoImovel: string;

  @Column({ name: 'codg_ocupacao', type: 'char', length: 1, nullable: true })
  codgOcupacao: string;

  @Column({ name: 'desc_parcialmente_ocupado', type: 'varchar', length: 256, nullable: true })
  descParcialmenteOcupado: string;

  @Column({ name: 'codg_tipo_imovel', type: 'char', length: 1, nullable: true })
  codgTipoImovel: string;

  @Column({ name: 'numr_area_total', type: 'numeric', precision: 9, scale: 2, nullable: true })
  numrAreaTotal: number;

  @Column({ name: 'numr_area_construida', type: 'numeric', precision: 9, scale: 2, nullable: true })
  numrAreaConstruida: number;

  @Column({ name: 'codg_registro_cartorio', type: 'varchar', length: 50, nullable: true })
  codgRegistroCartorio: string;

  @Column({ name: 'codg_matricula_imovel', type: 'varchar', length: 50, nullable: true })
  codgMatriculaImovel: string;

  @Column({ name: 'data_registro_imovel', type: 'timestamp', nullable: true })
  dataRegistroImovel: Date;

  @Column({ name: 'numg_cartorio', type: 'integer', nullable: true })
  numgCartorio: number;

  @Column({ name: 'nome_proprietario', type: 'varchar', length: 256, nullable: true })
  nomeProprietario: string;

  @Column({ name: 'numg_documento_escritura', type: 'integer', nullable: true })
  numgDocumentoEscritura: number;

  @Column({ name: 'numg_documento_certidao', type: 'integer', nullable: true })
  numgDocumentoCertidao: number;

  @Column({ name: 'data_cadastro', type: 'timestamp' })
  dataCadastro: Date;

  @Column({ name: 'numg_pessoa_cadastro', type: 'integer' })
  numgPessoaCadastro: number;

  @Column({ name: 'data_bloqueio', type: 'timestamp', nullable: true })
  dataBloqueio: Date;

  @Column({ name: 'numg_pessoa_bloqueio', type: 'integer', nullable: true })
  numgPessoaBloqueio: number;

  @Column({ name: 'data_exclusao', type: 'timestamp', nullable: true })
  dataExclusao: Date;

  @Column({ name: 'numg_pessoa_exclusao', type: 'integer', nullable: true })
  numgPessoaExclusao: number;

  @Column({ name: 'numg_destinacao', type: 'integer', nullable: true })
  numgDestinacao: number;

  @Column({ name: 'numg_situacao_regularizacao', type: 'integer', nullable: true })
  numgSituacaoRegularizacao: number;

  @Column({ name: 'numg_regiao', type: 'integer', nullable: true })
  numgRegiao: number;

  // Relacionamentos
  @ManyToOne(() => Imovel, imovel => imovel.imoveisFilhos)
  @JoinColumn({ name: 'numg_imovel_origem' })
  imovelOrigem: Imovel;

  @OneToMany(() => Imovel, imovel => imovel.imovelOrigem)
  imoveisFilhos: Imovel[];

  @ManyToOne(() => Municipio, municipio => municipio.imoveis)
  @JoinColumn({ name: 'numg_municipio' })
  municipio: Municipio;

  @ManyToOne(() => Cartorio, cartorio => cartorio.imoveis)
  @JoinColumn({ name: 'numg_cartorio' })
  cartorio: Cartorio;

  @ManyToOne(() => FinalidadeUso, finalidadeUso => finalidadeUso.imoveis)
  @JoinColumn({ name: 'numg_finalidade_uso' })
  finalidadeUso: FinalidadeUso;

  @OneToMany(() => Geolocalizacao, geolocalizacao => geolocalizacao.imovel)
  geolocalizacoes: Geolocalizacao[];

  @OneToMany(() => ImovelProjeto, projeto => projeto.imovel)
  projetos: ImovelProjeto[];
}