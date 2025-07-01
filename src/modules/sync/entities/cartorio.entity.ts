import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Municipio } from './municipio.entity';
import { Imovel } from './imovel.entity';

@Entity('ad_cartorio')
export class Cartorio {
  @PrimaryGeneratedColumn({ name: 'numg_cartorio' })
  numgCartorio: number;

  @Column({ name: 'nome_cartorio', type: 'varchar', length: 256, nullable: true })
  nomeCartorio: string;

  @Column({ name: 'desc_cartorio', type: 'varchar', length: 1000, nullable: true })
  descCartorio: string;

  @Column({ name: 'numg_municipio', type: 'integer' })
  numgMunicipio: number;

  @ManyToOne(() => Municipio, municipio => municipio.cartorios)
  @JoinColumn({ name: 'numg_municipio' })
  municipio: Municipio;

  @OneToMany(() => Imovel, imovel => imovel.cartorio)
  imoveis: Imovel[];
}