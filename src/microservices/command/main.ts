import { INestMicroservice } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

export const bootstrap = async () => {
  const application: INestMicroservice = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
  });
  return application.listenAsync();
};
