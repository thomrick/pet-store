import { Module } from '@nestjs/common';
import { BusModule } from './bus';
import { ConfigModule } from './config';
import { DatabaseModule } from './database';
import { RestApiModule } from './rest-api';

@Module({
  imports: [
    BusModule,
    ConfigModule,
    DatabaseModule,
    RestApiModule,
  ],
})
export class AppModule {}
