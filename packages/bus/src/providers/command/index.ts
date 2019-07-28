import { Provider } from '@nestjs/common';
import { AdoptCatCommandHandlerProvider } from './adopt-cat-command-handler.provider';
import { CommandBus } from './command-bus.provider';
import { CommandHandlers } from './command-handlers.provider';
import { RegisterCatCommandHandlerProvider } from './register-cat-command-handler.provider';

export * from './adopt-cat-command-handler.provider';
export * from './command-bus.provider';
export * from './command-handlers.provider';
export * from './register-cat-command-handler.provider';

export const CommandProviders: Provider[] = [
  RegisterCatCommandHandlerProvider,
  AdoptCatCommandHandlerProvider,
  CommandHandlers,
  CommandBus,
];
