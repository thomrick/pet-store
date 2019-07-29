import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from '@pet-store/database';
import {
  CommandBus,
  CommandProviders,
  QueryBus,
  QueryProviders,
} from './providers';

@Module({
  imports: [
    forwardRef(() => DatabaseModule),
  ],
  providers: [
    ...CommandProviders,
    ...QueryProviders,
  ],
  exports: [
    CommandBus,
    QueryBus,
  ],
})
export class BusModule {}
