import { CatAggregate, CatInformation, ICatRepository } from '../../domain';
import { FindOneCatById } from '../queries';
import { IQueryResult } from '../query-results';
import { FindOneCatByIdQueryHandler } from './find-one-cat-by-id.query-handler';
import { IQueryHandler } from './query-handler.interface';

describe('FindOneCatByIdQueryHandler', () => {
  let repository: ICatRepository;
  let handler: IQueryHandler;

  beforeEach(() => {
    repository = {
      get: jest.fn(),
      getAll: jest.fn(),
      save: jest.fn(),
    };
    handler = new FindOneCatByIdQueryHandler(repository);
  });

  it('should find the cat from the repository', () => {
    const aggregate = CatAggregate.register(new CatInformation('name'));
    (repository.get as jest.Mock).mockImplementationOnce(() => aggregate);

    const result: IQueryResult = handler.handle(new FindOneCatById(aggregate.model.id));

    expect(repository.get).toHaveBeenCalledWith(aggregate.model.id);
    expect(result.data).toEqual(aggregate);
  });
});
