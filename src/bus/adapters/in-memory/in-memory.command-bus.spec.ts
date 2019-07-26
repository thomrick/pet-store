import { ICommand, ICommandBus, ICommandHandler } from '../../../core';
import { InMemoryCommandBus } from './in-memory.command-bus';

describe('InMemoryCommandBus', () => {
  it('should dispatch command to the dedicated handler', () => {
    const command: ICommand = {
      name: 'FakeCommand',
    };
    const handlers: ICommandHandler[] = [
      {
        handle: jest.fn(),
        subscribe: () => command.name,
      },
      {
        handle: jest.fn(),
        subscribe: () => 'OtherCommand',
      },
    ];
    const bus: ICommandBus = new InMemoryCommandBus(handlers);

    bus.dispatch(command);

    expect(handlers[0].handle).toHaveBeenLastCalledWith(command);
    expect(handlers[1].handle).not.toHaveBeenCalled();
  });
});
