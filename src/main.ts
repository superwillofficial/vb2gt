import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { application } from 'express';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/core/filter/http-exception.filter';
import { TransformInterceptor } from './common/core/interceptor/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalPipes(new ValidationPipe())

  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('Api Document of Volleyball 2gether')
    .setDescription('all apis')
    .setVersion('0.1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  
  await app.listen(4001);
}
bootstrap();
