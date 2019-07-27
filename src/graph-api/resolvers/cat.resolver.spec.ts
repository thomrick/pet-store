import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request, { Response } from 'supertest';
import { GraphApiModule } from '../graph-api.module';

describe('CatResolver', () => {
  it('should get all cats', async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        GraphApiModule,
      ],
    })
    .compile();
    const application: INestApplication = module.createNestApplication();
    await application.init();

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

    expect(response.body.data.cats).toEqual([]);
  });
});
