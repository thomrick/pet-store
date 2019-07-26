import { IQuery, IQueryBus, IQueryHandler, IQueryResult } from '../../../core';

export class InMemoryQueryBus implements IQueryBus {
  private readonly handlers: Map<string, IQueryHandler>;

  constructor(handlers: IQueryHandler[]) {
    this.handlers = new Map(handlers.map((handler) => [handler.subscribe(), handler]));
  }

  public ask(query: IQuery): IQueryResult {
    const handler: IQueryHandler | undefined = this.handlers.get(query.name);
    if (!!handler) {
      return handler.handle(query);
    }
    return {
      getData: () => null,
    };
  }
}
