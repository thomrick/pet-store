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
} from '../../../core';
import { CatDto } from '../../dto';
import { GraphApiModule } from '../graph-api.module';

describe('CatResolver', () => {
  it('should get all cats', async () => {
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
    const application: INestApplication = module.createNestApplication();
    await application.init();

    const commands: ICommandBus = application.get(COMMAND_BUS);
    const queries: IQueryBus = application.get(QUERY_BUS);

    const aggregates = [
      CatAggregate.register(new CatInformation('nameA')),
      CatAggregate.register(new CatInformation('nameB')),
      CatAggregate.register(new CatInformation('nameC')),
    ];
    (queries.ask as jest.Mock).mockImplementationOnce(() => new FindAllCatsQueryResult(aggregates));

    const response: Response = await request(application.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        varaibles: {},
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
