import { Module } from '@nestjs/common';
import { ApiModule } from '@pet-store/api';

@Module({
  imports: [
    ApiModule,
  ],
})
export class AppModule {}
