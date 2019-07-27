import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request, { Response } from 'supertest';
import { COMMAND_BUS, QUERY_BUS } from '../../../bus';
import {
  CatAggregate,
  CatCommandResult,
  CatId,
  CatInformation,
  FindAllCats,
  FindAllCatsQueryResult,
  FindOneCatById,
  FindOneCatQueryResult,
  ICommandBus,
  IQueryBus,
  RegisterCat,
} from '../../../core';
import { CatDto } from '../../dto';
import { RestApiModule } from '../rest-api.module';

describe('CatsController', () => {
  let application: INestApplication;
  let commands: ICommandBus;
  let queries: IQueryBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        RestApiModule,
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
    application = module.createNestApplication();
    await application.init();
    commands = module.get(COMMAND_BUS);
    queries = module.get(QUERY_BUS);
  });

  afterEach(async () => {
    return application.close();
  });

  it('POST /cats create a new cat', async () => {
    const dto = CatDto.with('name');
    const aggregate = CatAggregate.register(new CatInformation(dto.name!));
    (commands.dispatch as jest.Mock).mockImplementationOnce(
      () => new CatCommandResult(aggregate),
    );

    const response: Response = await request(application.getHttpServer())
      .post('/cats')
      .send(dto)
      .expect(201);

    expect(commands.dispatch).toHaveBeenCalledWith(new RegisterCat(new CatInformation(dto.name!)));
    expect(response.body).toEqual(CatDto.from(aggregate));
  });

  it('POST /cats throw Bad Request Exception when required fields are not provided', async () => {
    await request(application.getHttpServer())
      .post('/cats')
      .send({})
      .expect(400);
  });

  it('GET /cats/:id should return a found cat dto', async () => {
    const aggregate = CatAggregate.register(new CatInformation('name'));
    const dto = CatDto.from(aggregate);
    (queries.ask as jest.Mock).mockImplementationOnce(() => new FindOneCatQueryResult(aggregate));

    const response: Response = await request(application.getHttpServer())
      .get(`/cats/${aggregate.model.id.value}`)
      .expect(200);
    expect(queries.ask).toHaveBeenCalledWith(new FindOneCatById(CatId.from(aggregate.model.id.value)));
    expect(response.body).toEqual(dto);
  });

  it('GET /cats/:id throw a Not Found exception when cat by id is not found', async () => {
    (queries.ask as jest.Mock).mockImplementationOnce(() => new FindOneCatQueryResult(null));

    return request(application.getHttpServer())
      .get(`/cats/fake-id`)
      .expect(404);
  });

  it('GET /cats shoud return all cats', async () => {
    (queries.ask as jest.Mock).mockImplementationOnce(() => new FindAllCatsQueryResult([]));

    const response: Response = await request(application.getHttpServer())
      .get('/cats')
      .expect(200);
    expect(queries.ask).toHaveBeenCalledWith(new FindAllCats());
    expect(response.body).toEqual([]);
  });
});
