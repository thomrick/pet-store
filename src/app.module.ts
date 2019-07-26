import { Module } from '@nestjs/common';
import { BusModule } from './bus';
import { DatabaseModule } from './database';
import { RestApiModule } from './rest-api';

@Module({
  imports: [
    DatabaseModule,
    BusModule,
    RestApiModule,
  ],
})
export class AppModule {}
