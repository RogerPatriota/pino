import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Pino API')
    .setDescription('Pino API description')
    .setVersion('1.0')
    .addTag('Autenticação')
    .addTag('Assistências')
    .addTag('Funcionários')
    .addTag('Clientes')
    .addTag('Categorias')
    .addTag('Produtos')
    .addTag('Modelos')
    .addTag('Serviços')
    .addTag('Estoque')
    .addTag('Ordens de Serviço')
    .addTag('Log Aparelhos')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document);

  app.use(
    'reference/',
    apiReference({
      url: 'api-json',
    })
  )

  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
