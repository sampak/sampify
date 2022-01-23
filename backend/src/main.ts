import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { join } from 'path';
import { AppModule } from './app.module';
import * as fs from 'fs';

async function createPublicFolder(){
  if (!fs.existsSync('public')) {
    fs.mkdirSync('public');
    console.log('Creating public folder');
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      validationError: {
        value: true,
        target: true,
      },
      stopAtFirstError: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    exposedHeaders: ['Content-Length', 'Content-Range', 'Content-Size']
    
  });
  await createPublicFolder();
  app.use('/public', express.static(join(__dirname, '..', 'public')));
  await app.listen(4000);
}
bootstrap();
