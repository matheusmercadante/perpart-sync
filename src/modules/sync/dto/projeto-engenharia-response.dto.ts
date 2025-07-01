import { ApiProperty } from '@nestjs/swagger';

export class LoteCriadoDto {
  @ApiProperty({ description: 'ID do lote no sistema externo' })
  externoId: string;

  @ApiProperty({ description: 'ID do lote no sistema interno' })
  internoId: number;
}

export class ProjetoEngenhariaResponseDto {
  @ApiProperty({ description: 'ID da gleba no sistema interno' })
  glebaId: number;

  @ApiProperty({ description: 'Lista de lotes criados', type: [LoteCriadoDto] })
  lotesCriados: LoteCriadoDto[];
}