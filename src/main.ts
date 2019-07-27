import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { ConfigService } from './config';

const bootstrap = async () => {
  const application: INestApplication & NestExpressApplication = await NestFactory.create(AppModule);
  application.useStaticAssets(join(process.cwd(), 'public'));
  application.setBaseViewsDir(join(process.cwd(), 'views'));
  application.setViewEngine('hbs');
  return application.listenAsync(application.get(ConfigService).get('PORT') || 8080);
};

bootstrap();
