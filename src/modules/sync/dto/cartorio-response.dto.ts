import { ApiProperty } from '@nestjs/swagger';

export class CartorioResponseDto {
  @ApiProperty({ description: 'ID do cartório no sistema2' })
  numgCartorio: number;

  @ApiProperty({ description: 'Nome do cartório' })
  nomeCartorio: string;

  @ApiProperty({ description: 'Descrição do cartório', nullable: true })
  descCartorio: string;

  @ApiProperty({ description: 'Nome do município' })
  nomeMunicipio: string;

  @ApiProperty({ description: 'UF do município' })
  siglUf: string;
}