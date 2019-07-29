import { Provider } from '@nestjs/common';
import { FindAllCatsQueryHandlerProvider } from './find-all-cats-query-handler.provider';
import { FindOneCatByIdQueryHandlerProvider } from './find-one-cat-by-id-query-handler.provider';
import { QueryBus } from './query-bus.provider';
import { QueryHandlers } from './query-handlers.provider';

export * from './query-bus.provider';

export const QueryProviders: Provider[] = [
  FindAllCatsQueryHandlerProvider,
  FindOneCatByIdQueryHandlerProvider,
  QueryBus,
  QueryHandlers,
];
