import { Injectable, Logger, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, IsNull } from 'typeorm';
import { Imovel } from './entities/imovel.entity';
import { SyncMapping } from './entities/sync-mapping.entity';
import { Cartorio } from './entities/cartorio.entity';
import { FinalidadeUso } from './entities/finalidade-uso.entity';
import { ImovelProjeto } from './entities/imovel-projeto.entity';
import { GlebaResponseDto } from './dto/gleba-response.dto';
import { CartorioResponseDto } from './dto/cartorio-response.dto';
import { CreateProjetoEngenhariaDto } from './dto/create-projeto-engenharia.dto';
import { ProjetoEngenhariaResponseDto, LoteCriadoDto } from './dto/projeto-engenharia-response.dto';

@Injectable()
export class SyncService {
  private readonly logger = new Logger(SyncService.name);

  constructor(
    @InjectRepository(Imovel)
    private imovelRepository: Repository<Imovel>,
    @InjectRepository(SyncMapping)
    private syncMappingRepository: Repository<SyncMapping>,
    @InjectRepository(Cartorio)
    private cartorioRepository: Repository<Cartorio>,
    @InjectRepository(FinalidadeUso)
    private finalidadeUsoRepository: Repository<FinalidadeUso>,
    private dataSource: DataSource,
  ) {}

  async findGlebaById(externoId: string): Promise<GlebaResponseDto> {
    this.logger.log(`Buscando gleba com externoId: ${externoId}`);

    // Buscar o mapeamento externo_id -> interno_id
    const mapping = await this.syncMappingRepository.findOne({
      where: {
        externoId,
        tipoEntidade: 'imovel'
      }
    });

    if (!mapping) {
      throw new NotFoundException(`Gleba não encontrada no mapeamento: ${externoId}`);
    }

    // Buscar a gleba com joins para obter dados relacionados
    const gleba = await this.imovelRepository.findOne({
      where: {
        numgImovel: mapping.internoId,
        codgTipoImovel: 'G', // G = Gleba
        dataExclusao: IsNull(), // Não excluído
      },
      relations: ['municipio', 'cartorio', 'finalidadeUso', 'geolocalizacoes'],
    });

    if (!gleba) {
      throw new NotFoundException(`Gleba não encontrada: numgImovel ${mapping.internoId}`);
    }

    // Buscar geometria principal da gleba
    const geometria = gleba.geolocalizacoes?.find(g => g.dataExclusao === null);

    return {
      numgImovel: gleba.numgImovel,
      codgIdentificador: gleba.codgIdentificador,
      codgLatitude: gleba.codgLatitude,
      codgLongitude: gleba.codgLongitude,
      codgCep: gleba.codgCep,
      descLogradouro: gleba.descLogradouro,
      numrEndereco: gleba.numrEndereco,
      descBairro: gleba.descBairro,
      nomeMunicipio: gleba.municipio?.nomeMunicipio,
      codgZoneamento: gleba.codgZoneamento,
      codgAreaInteresse: gleba.codgAreaInteresse,
      nomeFinalidadeUso: gleba.finalidadeUso?.nomeFinalidadeUso,
      numrAreaTotal: gleba.numrAreaTotal,
      numrAreaConstruida: gleba.numrAreaConstruida,
      codgMatriculaImovel: gleba.codgMatriculaImovel,
      dataRegistroImovel: gleba.dataRegistroImovel,
      nomeCartorio: gleba.cartorio?.nomeCartorio,
      nomeProprietario: gleba.nomeProprietario,
      geometria: geometria?.descGeometria,
      areaCalculada: geometria?.calculatedArea,
    };
  }

  async findCartorioById(externoId: string): Promise<CartorioResponseDto> {
    this.logger.log(`Buscando cartório com externoId: ${externoId}`);

    // Buscar o mapeamento externo_id -> numg_cartorio
    const mapping = await this.syncMappingRepository.findOne({
      where: {
        externoId,
        tipoEntidade: 'cartorio'
      }
    });

    if (!mapping) {
      throw new NotFoundException(`Cartório não encontrado no mapeamento: ${externoId}`);
    }

    // Buscar cartório com dados do município
    const cartorio = await this.cartorioRepository.findOne({
      where: { numgCartorio: mapping.internoId },
      relations: ['municipio'],
    });

    if (!cartorio) {
      throw new NotFoundException(`Cartório não encontrado: numgCartorio ${mapping.internoId}`);
    }

    return {
      numgCartorio: cartorio.numgCartorio,
      nomeCartorio: cartorio.nomeCartorio,
      descCartorio: cartorio.descCartorio,
      nomeMunicipio: cartorio.municipio?.nomeMunicipio,
      siglUf: cartorio.municipio?.siglUf,
    };
  }

  async updateSelagem(externoLoteId: string, numgFinalidadeUso: number): Promise<void> {
    this.logger.log(`Atualizando selagem do lote: ${externoLoteId}`);

    // Buscar o lote através do mapeamento
    const mapping = await this.syncMappingRepository.findOne({
      where: {
        externoId: externoLoteId,
        tipoEntidade: 'imovel',
      },
    });

    if (!mapping) {
      throw new NotFoundException(`Lote não encontrado no mapeamento: ${externoLoteId}`);
    }

    // Verificar se a finalidade de uso existe
    const finalidadeUso = await this.finalidadeUsoRepository.findOne({
      where: { numgFinalidadeUso }
    });

    if (!finalidadeUso) {
      throw new NotFoundException(`Finalidade de uso não encontrada: ${numgFinalidadeUso}`);
    }

    // Buscar o lote no banco
    const lote = await this.imovelRepository.findOne({
      where: {
        numgImovel: mapping.internoId,
        codgTipoImovel: 'L', // L = Lote
        dataExclusao: IsNull(),
      },
    });

    if (!lote) {
      throw new NotFoundException(`Lote não encontrado: numgImovel ${mapping.internoId}`);
    }

    // Atualizar finalidade de uso
    lote.numgFinalidadeUso = numgFinalidadeUso;
    await this.imovelRepository.save(lote);

    this.logger.log(`Finalidade de uso atualizada para o lote ${externoLoteId}: ${finalidadeUso.nomeFinalidadeUso}`);
  }

  async createProjetoEngenharia(dto: CreateProjetoEngenhariaDto): Promise<ProjetoEngenhariaResponseDto> {
    this.logger.log(`Criando projeto de engenharia para gleba: ${dto.externoGlebaId}`);

    return await this.dataSource.transaction(async manager => {
      // Buscar a gleba no mapeamento
      const glebaMapping = await manager.findOne(SyncMapping, {
        where: {
          externoId: dto.externoGlebaId,
          tipoEntidade: 'imovel',
        },
      });

      if (!glebaMapping) {
        throw new NotFoundException(`Gleba não encontrada no mapeamento: ${dto.externoGlebaId}`);
      }

      // Buscar a gleba no banco
      const gleba = await manager.findOne(Imovel, {
        where: {
          numgImovel: glebaMapping.internoId,
          codgTipoImovel: 'G', // G = Gleba
          dataExclusao: IsNull(),
        },
        relations: ['municipio', 'cartorio'],
      });

      if (!gleba) {
        throw new BadRequestException(`Gleba não encontrada ou excluída: numgImovel ${glebaMapping.internoId}`);
      }


      // Verificar duplicação de externo_lote_id
      for (const loteDto of dto.lotes) {
        const existingMapping = await manager.findOne(SyncMapping, {
          where: {
            externoId: loteDto.externoLoteId,
            tipoEntidade: 'imovel',
          },
        });

        if (existingMapping) {
          throw new ConflictException(`Lote já existe no mapeamento: ${loteDto.externoLoteId}`);
        }
      }

      // Criar registro do projeto
      const imovelProjeto = new ImovelProjeto();
      imovelProjeto.numgImovel = gleba.numgImovel;
      imovelProjeto.nomeProjeto = dto.projeto.nomeProjeto;
      imovelProjeto.numrTestada = dto.projeto.numrTestada;
      imovelProjeto.dataProjeto = new Date(dto.projeto.dataProjeto);
      imovelProjeto.dataAprovacao = dto.projeto.dataAprovacao ? new Date(dto.projeto.dataAprovacao) : undefined;
      imovelProjeto.dataValidade = dto.projeto.dataValidade ? new Date(dto.projeto.dataValidade) : undefined;
      imovelProjeto.codgSequencialImovel = dto.projeto.codgSequencialImovel;
      imovelProjeto.codgIdentificadorProjeto = dto.projeto.codgIdentificadorProjeto;
      imovelProjeto.dataCadastro = new Date();
      imovelProjeto.numgPessoaCadastro = 1; // TODO: Obter do contexto de autenticação

      await manager.save(ImovelProjeto, imovelProjeto);

      const lotesCriados: { externoId: string; internoId: number }[] = [];

      // Criar cada lote
      for (const loteDto of dto.lotes) {

        const novoLote = manager.create(Imovel, {
          numgImovelOrigem: gleba.numgImovel,
          codgIdentificador: loteDto.codgIdentificador,
          codgTipoImovel: 'L', // L = Lote
          // Herdar dados da gleba
          numgMunicipio: gleba.numgMunicipio,
          numgCartorio: gleba.numgCartorio,
          codgZoneamento: gleba.codgZoneamento,
          codgAreaInteresse: gleba.codgAreaInteresse,
          nomeProprietario: loteDto.nomeProprietario || gleba.nomeProprietario,
          // Dados específicos do lote
          codgCep: loteDto.codgCep,
          descLogradouro: loteDto.descLogradouro,
          numrEndereco: loteDto.numrEndereco,
          descBairro: loteDto.descBairro,
          descLote: loteDto.descLote,
          descQuadra: loteDto.descQuadra,
          flagEdificado: loteDto.flagEdificado,
          numrPavimento: loteDto.numrPavimento,
          codgEstadoImovel: loteDto.codgEstadoImovel,
          codgOcupacao: loteDto.codgOcupacao,
          descParcialmenteOcupado: loteDto.descParcialmenteOcupado,
          numrAreaTotal: loteDto.numrAreaTotal,
          numrAreaConstruida: loteDto.numrAreaConstruida,
          // Campos adicionais
          numgFinalidadeUso: loteDto.numgFinalidadeUso || gleba.numgFinalidadeUso,
          numgSituacaoRegularizacao: loteDto.numgSituacaoRegularizacao || 2, // 2 = Com Projeto Topográfico
          numgDestinacao: loteDto.numgDestinacao || gleba.numgDestinacao,
          // Dados de auditoria
          dataCadastro: new Date(),
          numgPessoaCadastro: 1, // TODO: Obter do contexto de autenticação
        });

        const loteSalvo = await manager.save(Imovel, novoLote);

        // Criar geometria do lote usando query raw para WKT
        if (loteDto.geometria) {
          await manager.query(
            `INSERT INTO ad_geolocalizacao (numg_imovel, desc_geometria, desc_tipo, data_cadastro, numg_pessoa_cadastro) 
             VALUES ($1, ST_SetSRID(ST_GeomFromText($2), 4326), $3, $4, $5)`,
            [
              loteSalvo.numgImovel,
              loteDto.geometria,
              'POLYGON',
              new Date(),
              1
            ]
          );
        }

        // Criar mapeamento
        const mapping = manager.create(SyncMapping, {
          externoId: loteDto.externoLoteId,
          internoId: loteSalvo.numgImovel,
          tipoEntidade: 'imovel',
        });

        await manager.save(SyncMapping, mapping);

        lotesCriados.push({
          externoId: loteDto.externoLoteId,
          internoId: loteSalvo.numgImovel,
        });

        this.logger.log(`Lote criado: ${loteDto.externoLoteId} -> ${loteSalvo.numgImovel}`);
      }

      this.logger.log(`Projeto de engenharia criado com ${lotesCriados.length} lotes`);

      return {
        glebaId: gleba.numgImovel,
        lotesCriados: lotesCriados as LoteCriadoDto[],
      };
    });
  }
}