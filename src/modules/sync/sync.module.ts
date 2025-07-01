import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { SyncController } from './sync.controller';
import { SyncService } from './sync.service';
import { SyncMapping } from './entities/sync-mapping.entity';
import { Imovel } from './entities/imovel.entity';
import { Municipio } from './entities/municipio.entity';
import { Cartorio } from './entities/cartorio.entity';
import { FinalidadeUso } from './entities/finalidade-uso.entity';
import { Geolocalizacao } from './entities/geolocalizacao.entity';
import { ImovelProjeto } from './entities/imovel-projeto.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([
      SyncMapping,
      Imovel,
      Municipio,
      Cartorio,
      FinalidadeUso,
      Geolocalizacao,
      ImovelProjeto,
    ]),
  ],
  controllers: [SyncController],
  providers: [SyncService],
})
export class SyncModule {}