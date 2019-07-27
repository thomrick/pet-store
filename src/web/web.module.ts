import { forwardRef, Module } from '@nestjs/common';
import { BusModule } from '../bus';
import { RootPageController } from './pages';

@Module({
  imports: [
    forwardRef(() => BusModule),
  ],
  controllers: [
    RootPageController,
  ],
})
export class WebModule {}
