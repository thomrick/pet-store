import { Module } from '@nestjs/common';
import { RegisterCatCommandHandlerProvider } from '../../bus';
import { DatabaseModule } from '../../database';
import { AppController } from './app.controller';

@Module({
  imports: [
    DatabaseModule,
  ],
  providers: [
    RegisterCatCommandHandlerProvider,
  ],
  controllers: [
    AppController,
  ],
})
export class AppModule {}
