import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { BusModule, COMMAND_BUS, QUERY_BUS } from '../../bus';
import {
  CatAggregate,
  CatId,
  CatInformation,
  FindAllCats,
  FindAllCatsQueryResult,
  FindOneCatById,
  FindOneCatQueryResult,
  ICommandBus,
  IQueryBus,
  RegisterCat,
} from '../../core';
import { CatDto } from '../dto';
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
    service.create(CatDto.with('name'));

    expect(commands.dispatch).toHaveBeenCalledWith(new RegisterCat(new CatInformation('name')));
  });

  it('should query one cat by id', () => {
    const aggregate = CatAggregate.register(new CatInformation('name'));
    (queries.ask as jest.Mock).mockImplementationOnce(() => new FindOneCatQueryResult(aggregate));

    const result: CatDto = service.findOneById(aggregate.model.id.value);

    expect(queries.ask).toHaveBeenCalledWith(new FindOneCatById(aggregate.model.id));
    expect(result).toEqual(CatDto.from(aggregate));
  });

  it('should throw a HTTP Not Found exception when cat is not found', () => {
    const id = CatId.create();
    (queries.ask as jest.Mock).mockImplementationOnce(() => new FindOneCatQueryResult(null));

    expect(() => service.findOneById(id.value)).toThrow(NotFoundException);
  });

  it('should query all cats', () => {
    const aggregates = [
      CatAggregate.register(new CatInformation('name')),
    ];
    (queries.ask as jest.Mock).mockImplementationOnce(() => new FindAllCatsQueryResult(aggregates));

    const result: CatDto[] = service.findAll();

    expect(queries.ask).toHaveBeenCalledWith(new FindAllCats());
    expect(result).toEqual(aggregates.map((aggregate) => CatDto.from(aggregate)));
  });
});
