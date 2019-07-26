import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from '../database';
import {
  AdoptCatCommandHandlerProvider,
  CommandBus,
  CommandHandlers,
  RegisterCatCommandHandlerProvider,
} from './providers';

@Module({
  imports: [
    forwardRef(() => DatabaseModule),
  ],
  providers: [
    RegisterCatCommandHandlerProvider,
    AdoptCatCommandHandlerProvider,
    CommandHandlers,
    CommandBus,
  ],
  exports: [
    CommandBus,
  ],
})
export class BusModule {}
