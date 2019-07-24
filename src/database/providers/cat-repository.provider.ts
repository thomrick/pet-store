import { Provider } from '@nestjs/common';
import { ICatRepository } from '../../core/domain';
import { InMemoryCatRepository } from '../../core/lib';

const CAT_REPOSITORY = 'CatRepository';

export const CatRepository: Provider = {
  provide: CAT_REPOSITORY,
  useFactory: (): ICatRepository => {
    return new InMemoryCatRepository();
  },
};
