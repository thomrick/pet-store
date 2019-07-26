import { IQuery, IQueryBus, IQueryHandler, IQueryResult } from '../../../core';
import { InMemoryQueryBus } from './in-memory.query-bus';

describe('InMemoryQueryBus', () => {
  it('can be created', () => {
    const handlers: IQueryHandler[] = [
      {
        handle: jest.fn(),
        subscribe: jest.fn(),
      },
    ];
    const bus: IQueryBus = new InMemoryQueryBus(handlers);
  });

  it('should ask query to the dedicated handler', () => {
    const data: any = { message: 'hello' };
    const query: IQuery = {
      name: 'FakeQuery',
    };
    const handlers: IQueryHandler[] = [
      {
        handle: jest.fn().mockImplementationOnce(() => ({ data })),
        subscribe: jest.fn().mockImplementationOnce(() => query.name),
      },
      {
        handle: jest.fn(),
        subscribe: jest.fn().mockImplementationOnce(() => 'OtherQuery'),
      },
    ];
    const bus: IQueryBus = new InMemoryQueryBus(handlers);

    const result: IQueryResult = bus.ask(query);

    expect(handlers[0].handle).toHaveBeenCalledWith(query);
    expect(handlers[1].handle).not.toHaveBeenCalled();
    expect(result.data).toEqual(data);
  });

  it('should return a default null result when no handler is found', () => {
    const query: IQuery = {
      name: 'FakeQuery',
    };
    const handlers: IQueryHandler[] = [];
    const bus: IQueryBus = new InMemoryQueryBus(handlers);

    const result: IQueryResult = bus.ask(query);

    expect(result.data).toBe(null);
  });
});
