import { CatInformation, ICatRepository, RegisterCatHandler } from '../../core';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto';

jest.mock('../../core');

describe('CatsService', () => {
  let registrator: RegisterCatHandler;
  let service: CatsService;

  beforeEach(() => {
    const repository: ICatRepository = {
      get: jest.fn(),
      save: jest.fn(),
    };
    registrator = new RegisterCatHandler(repository);
    service = new CatsService(registrator);
  });

  it('should regsiter a new cat', () => {
    spyOn(registrator, 'registerCatWhith');
    const dto = new CreateCatDto('name');

    service.create(dto);

    expect(registrator.registerCatWhith).toHaveBeenCalledWith(new CatInformation(dto.name));
  });
});
