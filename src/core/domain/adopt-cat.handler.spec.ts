import { AdoptCatHandler } from './adopt-cat.handler';
import { CatAggregate } from './aggregate';
import { CatAlreadyAdoptedException, CatNotFoundException } from './exceptions';
import { CatId } from './model';
import { ICatRepository } from './ports';

describe('AdoptCatHandler', () => {
  it('should adopt the cat', () => {
    const aggregate = CatAggregate.register('name');
    spyOn(aggregate, 'adopt');
    const repository: ICatRepository = {
      save: jest.fn(),
      get: jest.fn().mockImplementation(() => aggregate),
    };
    const handler = new AdoptCatHandler(repository);

    handler.adoptCat(aggregate.model.id);

    expect(repository.get).toHaveBeenCalledWith(aggregate.model.id);
    expect(aggregate.adopt).toHaveBeenCalled();
    expect(repository.save).toHaveBeenCalledWith(aggregate);
  });

  it('should throw an error if cat does not exist', () => {
    const repository: ICatRepository = {
      save: jest.fn(),
      get: jest.fn().mockImplementation(() => null),
    };
    const handler = new AdoptCatHandler(repository);

    expect(() => handler.adoptCat(CatId.create())).toThrow(CatNotFoundException);
  });

  it('should throw an error if cat is already adopted', () => {
    const aggregate = CatAggregate.register('name');
    jest.spyOn(aggregate, 'adopt').mockImplementation(() => {
      throw new CatAlreadyAdoptedException(aggregate.model.id);
    });
    const repository: ICatRepository = {
      save: jest.fn(),
      get: jest.fn().mockImplementation(() => aggregate),
    };
    const handler = new AdoptCatHandler(repository);

    expect(() => handler.adoptCat(CatId.create())).toThrow(CatAlreadyAdoptedException);
  });
});
