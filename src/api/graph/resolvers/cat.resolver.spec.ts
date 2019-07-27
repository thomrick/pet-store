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
import { GraphApiModule } from '../graph-api.module';

describe('CatResolver', () => {
  let application: INestApplication;
  let commands: ICommandBus;
  let queries: IQueryBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        GraphApiModule,
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
    commands = application.get(COMMAND_BUS);
    queries = application.get(QUERY_BUS);
  });

  afterEach(async () => {
    return application.close();
  });

  it('should dispatch command to register a new cat', async () => {
    const aggregate = CatAggregate.register(new CatInformation('name'));
    (commands.dispatch as jest.Mock).mockImplementationOnce(() => new CatCommandResult(aggregate));
    const response: Response = await request(application.getHttpServer())
      .post('/graphql')
      .send({
        query: `mutation {
          register(input: { name: "${aggregate.model.name}"}) { id name adopted }
        }`,
      })
      .expect(200);
    expect(commands.dispatch).toHaveBeenCalledWith(new RegisterCat(new CatInformation('name')));
    expect(response.body.data.register).toEqual(CatDto.from(aggregate));
  });

  it('should ask for all cats', async () => {
    const aggregates = [
      CatAggregate.register(new CatInformation('nameA')),
      CatAggregate.register(new CatInformation('nameB')),
      CatAggregate.register(new CatInformation('nameC')),
    ];
    (queries.ask as jest.Mock).mockImplementationOnce(() => new FindAllCatsQueryResult(aggregates));

    const response: Response = await request(application.getHttpServer())
      .post('/graphql')
      .send({
        query: `{
          cats {
            id
            name
            adopted
          }
        }`,
      })
      .expect(200);

    expect(queries.ask).toHaveBeenCalledWith(new FindAllCats());
    expect(response.body.data.cats).toEqual(aggregates.map((aggregate) => CatDto.from(aggregate)));
  });

  it('should ask for finding one cat by id', async () => {
    const aggregate = CatAggregate.register(new CatInformation('name'));
    (queries.ask as jest.Mock).mockImplementationOnce(() => new FindOneCatQueryResult(aggregate));

    const response: Response = await request(application.getHttpServer())
      .post('/graphql')
      .send({
        query: `{ cat(id: "${aggregate.model.id.value}") { id name adopted } }`,
      })
      .expect(200);

    expect(queries.ask).toHaveBeenCalledWith(new FindOneCatById(aggregate.model.id));
    expect(response.body.data.cat).toEqual(CatDto.from(aggregate));
  });

  it('should throw a Not Found exception', async () => {
    (queries.ask as jest.Mock).mockImplementationOnce(() => new FindOneCatQueryResult(null));

    const response: Response = await request(application.getHttpServer())
      .post('/graphql')
      .send({
        query: `{ cat(id: "${CatId.create()}") { id name adopted } }`,
      })
      .expect(200);

    expect(response.body.errors[0].message).toEqual({
      statusCode: 404,
      error: 'Not Found',
    });
  });
});
