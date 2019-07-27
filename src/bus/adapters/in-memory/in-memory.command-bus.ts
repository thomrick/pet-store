import { ICommand, ICommandBus, ICommandHandler, ICommandResult } from '../../../core';

export class InMemoryCommandBus implements ICommandBus {
  private readonly handlers: Map<string, ICommandHandler>;

  constructor(handlers: ICommandHandler[]) {
    this.handlers = new Map(handlers.map((handler) => [handler.subscribe(), handler]));
  }

  public dispatch(command: ICommand): ICommandResult {
    const handler: ICommandHandler | undefined = this.handlers.get(command.name);
    if (!!handler) {
      return handler.handle(command);
    }
    return {
      data: null,
    };
  }
}
