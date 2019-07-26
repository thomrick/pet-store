import { Module } from '@nestjs/common';
import { BusModule } from './bus';
import { DatabaseModule } from './database';

@Module({
  imports: [
    DatabaseModule,
    BusModule,
  ],
})
export class AppModule {}
