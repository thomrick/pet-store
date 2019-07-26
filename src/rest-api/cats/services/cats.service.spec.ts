import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { BusModule, COMMAND_BUS, QUERY_BUS } from '../../../bus';
import {
  CatAggregate,
  CatId,
  CatInformation,
  FindOneCatById,
  FindOneCatQueryResult,
  ICommandBus,
  IQueryBus,
  RegisterCat,
} from '../../../core';
import { CreateCatDto } from '../dto';
import { CatsService } from './cats.service';

describe('CatsService', () => {
  let commands: ICommandBus;
  let queries: IQueryBus;

  let service: CatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        BusModule,
      ],
      providers: [
        CatsService,
      ],
    })
    .overrideProvider(COMMAND_BUS)
    .useValue({
      dispatch: jest.fn(),
    })
    .overrideProvider(QUERY_BUS)
    .useValue({
      ask: jest.fn(),
    })
    .compile();
    commands = module.get(COMMAND_BUS);
    queries = module.get(QUERY_BUS);
    service = module.get(CatsService);
  });

  it('should dispatch a register cat command', () => {
    service.create(new CreateCatDto('name'));

    expect(commands.dispatch).toHaveBeenCalledWith(new RegisterCat(new CatInformation('name')));
  });

  it('should query one cat by id', () => {
    const aggregate = CatAggregate.register(new CatInformation('name'));
    (queries.ask as jest.Mock).mockImplementationOnce(() => new FindOneCatQueryResult(aggregate));

    const result: CatAggregate | null = service.findOneById(aggregate.model.id.value);

    expect(queries.ask).toHaveBeenCalledWith(new FindOneCatById(aggregate.model.id));
    expect(result).toEqual(aggregate);
  });

  it('should throw a HTTP Not Found exception when cat is not found', () => {
    const id = CatId.create();
    (queries.ask as jest.Mock).mockImplementationOnce(() => new FindOneCatQueryResult(null));

    expect(() => service.findOneById(id.value)).toThrow(NotFoundException);
  });
});
