import { Provider } from '@nestjs/common';
import { FindOneCatByIdQueryHandler, IQueryHandler } from '../../../core';

export const QUERY_HANDLERS: string = 'QueryHandlers';

export const QueryHandlers: Provider = {
  provide: QUERY_HANDLERS,
  useFactory: (...handlers: IQueryHandler[]): IQueryHandler[] => {
    return handlers;
  },
  inject: [
    FindOneCatByIdQueryHandler,
  ],
};