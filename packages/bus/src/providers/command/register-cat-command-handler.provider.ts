import { Provider } from '@nestjs/common';
import { ICatRepository, ICommandHandler, RegisterCatCommandHandler } from '@pet-store/core';
import { CAT_REPOSITORY } from '@pet-store/database';

export const RegisterCatCommandHandlerProvider: Provider = {
  provide: RegisterCatCommandHandler,
  useFactory: (repository: ICatRepository): ICommandHandler => {
    return new RegisterCatCommandHandler(repository);
  },
  inject: [
    CAT_REPOSITORY,
  ],
};
