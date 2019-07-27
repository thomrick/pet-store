import { Provider } from '@nestjs/common';
import { FindAllCatsQueryHandler, ICatRepository, IQueryHandler } from '../../../core';
import { CAT_REPOSITORY } from '../../../database';

export const FindAllCatsQueryHandlerProvider: Provider = {
  provide: FindAllCatsQueryHandler,
  useFactory: (repository: ICatRepository): IQueryHandler => {
    return new FindAllCatsQueryHandler(repository);
  },
  inject: [
    CAT_REPOSITORY,
  ],
};
