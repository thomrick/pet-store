import { CatAggregate, CatId, CatInformation, ICatRepository } from '../../domain';
import { CatCommandResult } from '../command-results';
import { RegisterCat } from '../commands';
import { ICommandHandler } from './command-handler.interface';
import { RegisterCatCommandHandler } from './register-cat.command-handler';

describe('RegisterCatCommandHandler', () => {
  it('should save the registered cat', () => {
    const repository: ICatRepository = {
      get: jest.fn(),
      getAll: jest.fn(),
      save: jest.fn(),
    };
    const handler: ICommandHandler = new RegisterCatCommandHandler(repository);

    const result: CatCommandResult = handler.handle(new RegisterCat(new CatInformation('name')));

    expect(repository.save).toHaveBeenCalledWith(jasmine.any(CatAggregate));
    expect(result.data.model).toEqual({
      _id: jasmine.any(CatId),
      _name: 'name',
      _adopted: false,
    });
  });
});
