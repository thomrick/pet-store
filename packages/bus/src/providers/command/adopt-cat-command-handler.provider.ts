import { Provider } from '@nestjs/common';
import { AdoptCatCommandHandler, ICatRepository, ICommandHandler } from '@pet-store/core';
import { CAT_REPOSITORY } from '@pet-store/database';

export const AdoptCatCommandHandlerProvider: Provider = {
  provide: AdoptCatCommandHandler,
  useFactory: (repository: ICatRepository): ICommandHandler => {
    return new AdoptCatCommandHandler(repository);
  },
  inject: [
    CAT_REPOSITORY,
  ],
};
