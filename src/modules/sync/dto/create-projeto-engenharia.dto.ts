import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsNumber, IsDateString, IsBase64, IsArray, ValidateNested, IsOptional } from 'class-validator';

export class ProjetoDto {
  @ApiProperty({ description: 'Nome do projeto' })
  @IsNotEmpty()
  @IsString()
  nomeProjeto: string;

  @ApiProperty({ description: 'Testada em metros' })
  @IsNotEmpty()
  @IsNumber()
  numrTestada: number;

  @ApiProperty({ description: 'Data do projeto' })
  @IsNotEmpty()
  @IsDateString()
  dataProjeto: string;

  @ApiProperty({ description: 'Data de aprovação', required: false })
  @IsOptional()
  @IsDateString()
  dataAprovacao?: string;

  @ApiProperty({ description: 'Data de validade', required: false })
  @IsOptional()
  @IsDateString()
  dataValidade?: string;

  @ApiProperty({ description: 'Código sequencial do imóvel', required: false })
  @IsOptional()
  @IsString()
  codgSequencialImovel?: string;

  @ApiProperty({ description: 'Código identificador do projeto', required: false })
  @IsOptional()
  @IsString()
  codgIdentificadorProjeto?: string;
}

export class LoteDto {
  @ApiProperty({ description: 'ID do lote no sistema externo' })
  @IsNotEmpty()
  @IsString()
  externoLoteId: string;

  @ApiProperty({ description: 'Geometria do lote (WKT)' })
  @IsNotEmpty()
  @IsString()
  geometria: string;

  @ApiProperty({ description: 'Código identificador', required: false })
  @IsOptional()
  @IsString()
  codgIdentificador?: string;

  @ApiProperty({ description: 'CEP', required: false })
  @IsOptional()
  @IsString()
  codgCep?: string;

  @ApiProperty({ description: 'Logradouro', required: false })
  @IsOptional()
  @IsString()
  descLogradouro?: string;

  @ApiProperty({ description: 'Número do endereço', required: false })
  @IsOptional()
  @IsNumber()
  numrEndereco?: number;

  @ApiProperty({ description: 'Bairro', required: false })
  @IsOptional()
  @IsString()
  descBairro?: string;

  @ApiProperty({ description: 'Lote', required: false })
  @IsOptional()
  @IsString()
  descLote?: string;

  @ApiProperty({ description: 'Quadra', required: false })
  @IsOptional()
  @IsString()
  descQuadra?: string;

  @ApiProperty({ description: 'Flag edificado', required: false })
  @IsOptional()
  flagEdificado?: boolean;

  @ApiProperty({ description: 'Número de pavimentos', required: false })
  @IsOptional()
  @IsNumber()
  numrPavimento?: number;

  @ApiProperty({ description: 'Código do estado do imóvel', required: false })
  @IsOptional()
  @IsString()
  codgEstadoImovel?: string;

  @ApiProperty({ description: 'Código da ocupação', required: false })
  @IsOptional()
  @IsString()
  codgOcupacao?: string;

  @ApiProperty({ description: 'Descrição parcialmente ocupado', required: false })
  @IsOptional()
  @IsString()
  descParcialmenteOcupado?: string;

  @ApiProperty({ description: 'Área total em metros quadrados' })
  @IsNotEmpty()
  @IsNumber()
  numrAreaTotal: number;

  @ApiProperty({ description: 'Área construída em metros quadrados', required: false })
  @IsOptional()
  @IsNumber()
  numrAreaConstruida?: number;

  @ApiProperty({ description: 'Nome do proprietário', required: false })
  @IsOptional()
  @IsString()
  nomeProprietario?: string;

  @ApiProperty({ description: 'ID da finalidade de uso', required: false })
  @IsOptional()
  @IsNumber()
  numgFinalidadeUso?: number;

  @ApiProperty({ description: 'ID da situação de regularização', required: false })
  @IsOptional()
  @IsNumber()
  numgSituacaoRegularizacao?: number;

  @ApiProperty({ description: 'ID da destinação', required: false })
  @IsOptional()
  @IsNumber()
  numgDestinacao?: number;
}

export class CreateProjetoEngenhariaDto {
  @ApiProperty({ description: 'ID da gleba no sistema externo' })
  @IsNotEmpty()
  @IsString()
  externoGlebaId: string;

  @ApiProperty({ description: 'Dados do projeto', type: ProjetoDto })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ProjetoDto)
  projeto: ProjetoDto;

  @ApiProperty({ description: 'Lista de lotes do projeto', type: [LoteDto] })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LoteDto)
  lotes: LoteDto[];
}