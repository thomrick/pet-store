import { forwardRef, Module } from '@nestjs/common';
import { BusModule } from '../../bus';
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
