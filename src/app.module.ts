import { Module } from '@nestjs/common';
import { BusModule } from './bus';
import { ConfigModule } from './config';
import { DatabaseModule } from './database';
import { GraphApiModule } from './graph-api';
import { RestApiModule } from './rest-api';

@Module({
  imports: [
    BusModule,
    ConfigModule,
    DatabaseModule,
    GraphApiModule,
    RestApiModule,
  ],
})
export class AppModule {}
