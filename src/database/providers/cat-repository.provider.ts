import { Provider } from '@nestjs/common';
import { ICatRepository } from '../../core';
import { InMemoryCatRepository } from '../adapters';

const CAT_REPOSITORY = 'CatRepository';

export const CatRepository: Provider = {
  provide: CAT_REPOSITORY,
  useFactory: (): ICatRepository => {
    return new InMemoryCatRepository();
  },
};
