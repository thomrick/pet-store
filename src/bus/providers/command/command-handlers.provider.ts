import { Provider } from '@nestjs/common';
import { AdoptCatCommandHandler, ICommandHandler, RegisterCatCommandHandler } from '../../../core';

export const COMMAND_HANDLERS: string = 'CommandHandlers';

export const CommandHandlers: Provider = {
  provide: 'CommandHandlers',
  useFactory: (...handlers: ICommandHandler[]): ICommandHandler[] => {
    return handlers;
  },
  inject: [
    RegisterCatCommandHandler,
    AdoptCatCommandHandler,
  ],
};
