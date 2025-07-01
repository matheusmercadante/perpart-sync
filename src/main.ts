import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  // Configuração global de validação
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove propriedades não definidas nos DTOs
      forbidNonWhitelisted: true, // Rejeita requests com propriedades não permitidas
      transform: true, // Transforma automaticamente os tipos
    }),
  );

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('API de Sincronização de Imóveis')
    .setDescription(
      'API para sincronização entre dois sistemas de gestão de imóveis. ' +
      'Permite consultar glebas e cartórios, criar projetos de engenharia e atualizar selagens.',
    )
    .setVersion('1.0')
    .addApiKey(
      {
        type: 'apiKey',
        name: 'X-API-Key',
        in: 'header',
        description: 'Chave de API para autenticação',
      },
      'X-API-Key',
    )
    .addTag('sync', 'Operações de sincronização entre sistemas')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  
  logger.log(`Aplicação rodando na porta ${port}`);
  logger.log(`Documentação Swagger disponível em: http://localhost:${port}/api/docs`);
}
bootstrap();
