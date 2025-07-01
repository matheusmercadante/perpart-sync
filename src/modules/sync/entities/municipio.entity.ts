import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Imovel } from './imovel.entity';
import { Cartorio } from './cartorio.entity';

@Entity('ad_municipio')
export class Municipio {
  @PrimaryGeneratedColumn({ name: 'numg_municipio' })
  numgMunicipio: number;

  @Column({ name: 'nome_municipio', type: 'varchar', length: 256, nullable: true })
  nomeMunicipio: string;

  @Column({ name: 'sigl_uf', type: 'char', length: 2, nullable: false })
  siglUf: string;

  @OneToMany(() => Imovel, imovel => imovel.municipio)
  imoveis: Imovel[];

  @OneToMany(() => Cartorio, cartorio => cartorio.municipio)
  cartorios: Cartorio[];
}