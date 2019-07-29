import { forwardRef, Module } from '@nestjs/common';
import { BusModule } from '@pet-store/bus';
import { CatsController } from './controllers';

@Module({
  imports: [
    forwardRef(() => BusModule),
  ],
  controllers: [
    CatsController,
  ],
})
export class RestApiModule {}
