import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsIn } from 'class-validator';

export class UpdateSelagemDto {
  @ApiProperty({ 
    description: 'ID da finalidade de uso do lote',
    example: 11,
    enum: [2, 3, 4, 9, 11, 15, 16, 17, 18, 20]
  })
  @IsNotEmpty()
  @IsNumber()
  @IsIn([2, 3, 4, 9, 11, 15, 16, 17, 18, 20]) // IDs válidos de finalidade_uso
  numgFinalidadeUso: number;
}