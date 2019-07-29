import { Provider } from '@nestjs/common';
import { ICatRepository } from '@pet-store/core';
import { InMemoryCatRepository } from '../adapters';

export const CAT_REPOSITORY = 'CatRepository';

export const CatRepository: Provider = {
  provide: CAT_REPOSITORY,
  useFactory: (): ICatRepository => {
    return new InMemoryCatRepository();
  },
};
