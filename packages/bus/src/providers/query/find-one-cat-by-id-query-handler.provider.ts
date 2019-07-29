import { Provider } from '@nestjs/common';
import { FindOneCatByIdQueryHandler, ICatRepository, IQueryHandler } from '@pet-store/core';
import { CAT_REPOSITORY } from '@pet-store/database';

export const FindOneCatByIdQueryHandlerProvider: Provider = {
  provide: FindOneCatByIdQueryHandler,
  useFactory: (repository: ICatRepository): IQueryHandler => {
    return new FindOneCatByIdQueryHandler(repository);
  },
  inject: [
    CAT_REPOSITORY,
  ],
};
