import { forwardRef, Module } from '@nestjs/common';
import { BusModule } from '../bus';
import { CatsController } from './controllers';
import { CatsService } from './services';

@Module({
  imports: [
    forwardRef(() => BusModule),
  ],
  controllers: [
    CatsController,
  ],
  providers: [
    CatsService,
  ],
})
export class RestApiModule {}
