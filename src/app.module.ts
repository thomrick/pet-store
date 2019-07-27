import { Module } from '@nestjs/common';
import { ApiModule } from './api';
import { BusModule } from './bus';
import { ConfigModule } from './config';
import { DatabaseModule } from './database';
import { WebModule } from './web';

@Module({
  imports: [
    ApiModule,
    BusModule,
    ConfigModule,
    DatabaseModule,
    WebModule,
  ],
})
export class AppModule {}
