import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request, { Response } from 'supertest';
import { COMMAND_BUS, QUERY_BUS } from '../../../bus';
import {
  CatAggregate,
  CatInformation,
  FindAllCats,
  FindAllCatsQueryResult,
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
    const response: Response = await request(application.getHttpServer())
      .post('/graphql')
      .send({
        query: `mutation {
          register(input: { name: "name"}) { name }
        }`,
      })
      .expect(200);
    expect(commands.dispatch).toHaveBeenCalledWith(new RegisterCat(new CatInformation('name')));
    // expect(response.body.data.register).toEqual({
    //   id: jasmine.any(String),
    //   name: 'name',
    //   adopted: false,
    // });
  });

  it('should get all cats', async () => {
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
});
