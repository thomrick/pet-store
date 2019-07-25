import { Provider } from '@nestjs/common';
import { ICatRepository, InMemoryCatRepository } from '../../core';

const CAT_REPOSITORY = 'CatRepository';

export const CatRepository: Provider = {
  provide: CAT_REPOSITORY,
  useFactory: (): ICatRepository => {
    return new InMemoryCatRepository();
  },
};
