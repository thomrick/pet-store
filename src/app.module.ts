import { Module } from '@nestjs/common';
import { ApiModule } from './api';
import { BusModule } from './bus';
import { ConfigModule } from './config';
import { DatabaseModule } from './database';

@Module({
  imports: [
    ApiModule,
    BusModule,
    ConfigModule,
    DatabaseModule,
  ],
})
export class AppModule {}
