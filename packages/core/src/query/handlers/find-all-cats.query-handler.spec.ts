import { ICatRepository } from '../../domain';
import { FindAllCats } from '../queries';
import { IQueryResult } from '../query-results';
import { FindAllCatsQueryHandler } from './find-all-cats.query-handler';
import { IQueryHandler } from './query-handler.interface';

describe('FindAllCatsQueryHandler', () => {
  it('should find all cats from repository', () => {
    const repository: ICatRepository = {
      get: jest.fn(),
      getAll: jest.fn().mockImplementationOnce(() => []),
      save: jest.fn(),
    };
    const handler: IQueryHandler = new FindAllCatsQueryHandler(repository);

    const result: IQueryResult = handler.handle(new FindAllCats());

    expect(repository.getAll).toHaveBeenCalled();
    expect(result.data).toEqual([]);
  });
});
