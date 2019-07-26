import { Provider } from '@nestjs/common';
import { IQueryBus, IQueryHandler } from '../../../core';
import { InMemoryQueryBus } from '../../adapters';
import { QUERY_HANDLERS } from './query-handlers.provider';

export const QUERY_BUS: string = 'QueryBus';

export const QueryBus: Provider = {
  provide: QUERY_BUS,
  useFactory: (handlers: IQueryHandler[]): IQueryBus => {
    return new InMemoryQueryBus(handlers);
  },
  inject: [
    QUERY_HANDLERS,
  ],
};
