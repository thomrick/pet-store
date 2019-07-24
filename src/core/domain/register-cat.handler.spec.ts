import { CatAggregate } from './aggregate';
import { CatInformation } from './model';
import { ICatRepository } from './ports';
import { RegisterCatHandler } from './register-cat.handler';

describe('RegisterCatHandler', () => {
  it('should save the aggregate in the repository', () => {
    const repository: ICatRepository = {
      save: jest.fn(),
      get: jest.fn(),
    };
    const handler = new RegisterCatHandler(repository);
    const information = new CatInformation('name');

    handler.registerCatWhith(information);

    expect(repository.save).toHaveBeenCalledWith(jasmine.any(CatAggregate));
  });
});
