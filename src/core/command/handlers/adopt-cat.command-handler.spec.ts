import {
  CatAggregate,
  CatAlreadyAdoptedException,
  CatId, CatInformation,
  CatNotFoundException,
  ICatRepository,
} from '../../domain';
import { AdoptCat } from '../commands';
import { AdoptCatCommandHandler } from './adopt-cat.command-handler';
import { ICommandHandler } from './command-handler.interface';

describe('AdoptCatCommandHandler', () => {
  let repository: ICatRepository;
  let handler: ICommandHandler;

  beforeEach(() => {
    repository = {
      get: jest.fn(),
      save: jest.fn(),
    };
    handler = new AdoptCatCommandHandler(repository);
  });

  it('should adopt the cat', () => {
    const aggregate = CatAggregate.register(new CatInformation('name'));
    spyOn(aggregate, 'adopt');
    (repository.get as jest.Mock).mockImplementationOnce(() => aggregate);

    handler.handle(new AdoptCat(aggregate.model.id));

    expect(repository.get).toHaveBeenCalledWith(aggregate.model.id);
    expect(aggregate.adopt).toHaveBeenCalled();
    expect(repository.save).toHaveBeenCalledWith(aggregate);
  });

  it('should throw an error when cat is not found', () => {
    const id = CatId.create();
    (repository.get as jest.Mock).mockImplementationOnce(() => null);

    expect(() => handler.handle(new AdoptCat(id))).toThrow(CatNotFoundException);
  });

  it('should throw an error when cat is already adopted', () => {
    const aggregate = CatAggregate.register(new CatInformation('name'));
    jest.spyOn(aggregate, 'adopt').mockImplementationOnce(() => {
      throw new CatAlreadyAdoptedException(aggregate.model.id);
    });
    (repository.get as jest.Mock).mockImplementationOnce(() => aggregate);

    expect(() => handler.handle(new AdoptCat(aggregate.model.id))).toThrow(CatAlreadyAdoptedException);
  });
});
