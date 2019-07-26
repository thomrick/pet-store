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
        handle: jest.fn().mockImplementationOnce(() => ({
          getData: () => data,
        })),
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
    expect(result.getData()).toEqual(data);
  });
});
