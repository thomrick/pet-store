import { Provider } from '@nestjs/common';
import { ICatRepository, RegisterCatHandler } from '../../../core';

export const RegisterCatHandlerProvider: Provider = {
  provide: RegisterCatHandler,
  useFactory: (repository: ICatRepository): RegisterCatHandler => {
    return new RegisterCatHandler(repository);
  },
  inject: [],
};
