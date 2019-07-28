import { ICommand, ICommandBus, ICommandHandler, ICommandResult } from '@pet-store/core';
import { InMemoryCommandBus } from './in-memory.command-bus';

describe('InMemoryCommandBus', () => {
  it('should dispatch command to the dedicated handler', () => {
    const command: ICommand = {
      name: 'FakeCommand',
    };
    const handlers: ICommandHandler[] = [
      {
        handle: jest.fn().mockImplementationOnce(() => ({ data: { message: 'OK' } })),
        subscribe: () => command.name,
      },
      {
        handle: jest.fn(),
        subscribe: () => 'OtherCommand',
      },
    ];
    const bus: ICommandBus = new InMemoryCommandBus(handlers);

    const result: ICommandResult = bus.dispatch(command);

    expect(handlers[0].handle).toHaveBeenLastCalledWith(command);
    expect(handlers[1].handle).not.toHaveBeenCalled();
    expect(result.data).toEqual({ message: 'OK' });
  });
});
