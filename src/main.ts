import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config';

const bootstrap = async () => {
  const application: INestApplication = await NestFactory.create(AppModule);
  return application.listenAsync(application.get(ConfigService).get('PORT') || 8080);
};

bootstrap();
