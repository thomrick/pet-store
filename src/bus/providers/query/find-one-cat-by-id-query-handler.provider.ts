import { Provider } from '@nestjs/common';
import { FindOneCatByIdQueryHandler, ICatRepository, IQueryHandler } from '../../../core';
import { CAT_REPOSITORY } from '../../../database';

export const FindOneCatByIdQueryHandlerProvider: Provider = {
  provide: FindOneCatByIdQueryHandler,
  useFactory: (repository: ICatRepository): IQueryHandler => {
    return new FindOneCatByIdQueryHandler(repository);
  },
  inject: [
    CAT_REPOSITORY,
  ],
};
