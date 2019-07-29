import { Module } from '@nestjs/common';
import { CatRepository } from './providers';

@Module({
  providers: [
    CatRepository,
  ],
  exports: [
    CatRepository,
  ],
})
export class DatabaseModule {}
