import { Controller, Get, Post, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiHeader } from '@nestjs/swagger';
import { SyncService } from './sync.service';
import { ApiKeyGuard } from './guards/api-key.guard';
import { GlebaResponseDto } from './dto/gleba-response.dto';
import { CartorioResponseDto } from './dto/cartorio-response.dto';
import { CreateProjetoEngenhariaDto } from './dto/create-projeto-engenharia.dto';
import { ProjetoEngenhariaResponseDto } from './dto/projeto-engenharia-response.dto';
import { UpdateSelagemDto } from './dto/update-selagem.dto';

@ApiTags('sync')
@Controller('sync')
@UseGuards(ApiKeyGuard)
@ApiHeader({
  name: 'X-API-Key',
  description: 'Chave de API para autenticação',
  required: true,
})
export class SyncController {
  constructor(private readonly syncService: SyncService) {}

  @Get('gleba/:externo_id')
  @ApiOperation({ summary: 'Buscar dados de uma gleba' })
  @ApiResponse({
    status: 200,
    description: 'Dados da gleba encontrada',
    type: GlebaResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Gleba não encontrada' })
  @ApiResponse({ status: 401, description: 'API Key inválida' })
  async getGleba(@Param('externo_id') externoId: string): Promise<GlebaResponseDto> {
    return this.syncService.findGlebaById(externoId);
  }

  @Get('cartorio/:externo_id')
  @ApiOperation({ summary: 'Buscar dados de um cartório' })
  @ApiResponse({
    status: 200,
    description: 'Dados do cartório encontrado',
    type: CartorioResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Cartório não encontrado' })
  @ApiResponse({ status: 401, description: 'API Key inválida' })
  async getCartorio(@Param('externo_id') externoId: string): Promise<CartorioResponseDto> {
    return this.syncService.findCartorioById(externoId);
  }

  @Post('projeto-engenharia')
  @ApiOperation({ summary: 'Criar lotes a partir de uma gleba (divisão de terreno)' })
  @ApiResponse({
    status: 201,
    description: 'Projeto de engenharia criado com sucesso',
    type: ProjetoEngenhariaResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos ou gleba não encontrada' })
  @ApiResponse({ status: 404, description: 'Gleba não encontrada' })
  @ApiResponse({ status: 409, description: 'Lote já existe' })
  @ApiResponse({ status: 401, description: 'API Key inválida' })
  async createProjetoEngenharia(
    @Body() dto: CreateProjetoEngenhariaDto,
  ): Promise<ProjetoEngenhariaResponseDto> {
    return this.syncService.createProjetoEngenharia(dto);
  }

  @Patch('selagem/:externo_lote_id')
  @ApiOperation({ summary: 'Atualizar finalidade de uso após selagem' })
  @ApiResponse({ status: 200, description: 'Finalidade de uso atualizada com sucesso' })
  @ApiResponse({ status: 404, description: 'Lote não encontrado' })
  @ApiResponse({ status: 401, description: 'API Key inválida' })
  async updateSelagem(
    @Param('externo_lote_id') externoLoteId: string,
    @Body() dto: UpdateSelagemDto,
  ): Promise<{ message: string }> {
    await this.syncService.updateSelagem(externoLoteId, dto.numgFinalidadeUso);
    return { message: 'Finalidade de uso atualizada com sucesso' };
  }
}