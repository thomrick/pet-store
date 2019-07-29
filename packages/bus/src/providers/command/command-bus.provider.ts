import { Provider } from '@nestjs/common';
import { ICommandBus, ICommandHandler } from '@pet-store/core';
import { InMemoryCommandBus } from '../../adapters';
import { COMMAND_HANDLERS } from './command-handlers.provider';

export const COMMAND_BUS: string = 'CommandBus';

export const CommandBus: Provider = {
  provide: COMMAND_BUS,
  useFactory: (handlers: ICommandHandler[]): ICommandBus => {
    return new InMemoryCommandBus(handlers);
  },
  inject: [
    COMMAND_HANDLERS,
  ],
};
