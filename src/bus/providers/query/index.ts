import { Provider } from '@nestjs/common';
import { FindOneCatByIdQueryHandlerProvider } from './find-one-cat-by-id-query-handler.provider';
import { QueryBus } from './query-bus.provider';
import { QueryHandlers } from './query-handlers.provider';

export * from './query-bus.provider';

export const QueryProviders: Provider[] = [
  FindOneCatByIdQueryHandlerProvider,
  QueryBus,
  QueryHandlers,
];
