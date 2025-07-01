import { ApiProperty } from '@nestjs/swagger';

export class GlebaResponseDto {
  @ApiProperty({ description: 'ID do imóvel no sistema2' })
  numgImovel: number;

  @ApiProperty({ description: 'Código identificador', nullable: true })
  codgIdentificador: string;

  @ApiProperty({ description: 'Latitude', nullable: true })
  codgLatitude: string;

  @ApiProperty({ description: 'Longitude', nullable: true })
  codgLongitude: string;

  @ApiProperty({ description: 'CEP', nullable: true })
  codgCep: string;

  @ApiProperty({ description: 'Logradouro', nullable: true })
  descLogradouro: string;

  @ApiProperty({ description: 'Número do endereço', nullable: true })
  numrEndereco: number;

  @ApiProperty({ description: 'Bairro', nullable: true })
  descBairro: string;

  @ApiProperty({ description: 'Município', nullable: true })
  nomeMunicipio: string;

  @ApiProperty({ description: 'Zoneamento', nullable: true })
  codgZoneamento: string;

  @ApiProperty({ description: 'Área de interesse social', nullable: true })
  codgAreaInteresse: string;

  @ApiProperty({ description: 'Finalidade de uso', nullable: true })
  nomeFinalidadeUso: string;

  @ApiProperty({ description: 'Área total em metros quadrados', nullable: true })
  numrAreaTotal: number;

  @ApiProperty({ description: 'Área construída em metros quadrados', nullable: true })
  numrAreaConstruida: number;

  @ApiProperty({ description: 'Código da matrícula no cartório', nullable: true })
  codgMatriculaImovel: string;

  @ApiProperty({ description: 'Data de registro no cartório', nullable: true })
  dataRegistroImovel: Date;

  @ApiProperty({ description: 'Nome do cartório', nullable: true })
  nomeCartorio: string;

  @ApiProperty({ description: 'Nome do proprietário', nullable: true })
  nomeProprietario: string;

  @ApiProperty({ description: 'Geometria da gleba (WKT)', nullable: true })
  geometria?: string;

  @ApiProperty({ description: 'Área calculada da geometria', nullable: true })
  areaCalculada?: number;
}