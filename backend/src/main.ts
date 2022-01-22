import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    exposedHeaders: ['Content-Length', 'Content-Range', 'Content-Size']
    
  });
  app.use('/public', express.static(join(__dirname, '..', 'public')));
  await app.listen(4000);
}
bootstrap();
