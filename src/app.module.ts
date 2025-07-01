import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SyncModule } from './modules/sync/sync.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DATABASE_URL'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false, // Usar migrations em produção
        logging: configService.get('NODE_ENV') === 'development',
        extra: {
          charset: 'utf8mb4_unicode_ci',
        },
      }),
      inject: [ConfigService],
    }),
    SyncModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
