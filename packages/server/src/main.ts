import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const bootstrap = async () => {
  const application: INestApplication = await NestFactory.create(AppModule);
  return application.listenAsync(8080);
};

bootstrap();
