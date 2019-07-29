import { Module } from '@nestjs/common';
import { GraphApiModule } from './graph';
import { RestApiModule } from './rest';

@Module({
  imports: [
    GraphApiModule,
    RestApiModule,
  ],
})
export class ApiModule {}
