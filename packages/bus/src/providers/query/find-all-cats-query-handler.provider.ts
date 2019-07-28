import { Provider } from '@nestjs/common';
import { FindAllCatsQueryHandler, ICatRepository, IQueryHandler } from '@pet-store/core';
import { CAT_REPOSITORY } from '@pet-store/database';

export const FindAllCatsQueryHandlerProvider: Provider = {
  provide: FindAllCatsQueryHandler,
  useFactory: (repository: ICatRepository): IQueryHandler => {
    return new FindAllCatsQueryHandler(repository);
  },
  inject: [
    CAT_REPOSITORY,
  ],
};
