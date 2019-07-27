import { INestApplication } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Test, TestingModule } from '@nestjs/testing';
import { join } from 'path';
import request from 'supertest';
import { QUERY_BUS } from '../../bus';
import { CatAggregate, CatInformation, FindAllCats, FindAllCatsQueryResult, IQueryBus } from '../../core';
import { WebModule } from '../web.module';

describe('RootPageController', () => {
  let application: INestApplication & NestExpressApplication;
  let queries: IQueryBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        WebModule,
      ],
    })
    .overrideProvider(QUERY_BUS)
    .useValue({
      ask: jest.fn(),
    })
    .compile();
    application = module.createNestApplication();
    application.useStaticAssets(join(process.cwd(), 'public'));
    application.setBaseViewsDir(join(process.cwd(), 'views'));
    application.setViewEngine('hbs');
    await application.init();
    queries = application.get(QUERY_BUS);
  });

  afterEach(async () => {
    return application.close();
  });

  it('should render the view with all the cats', async () => {
    const aggregates = [
      CatAggregate.register(new CatInformation('nameA')),
      CatAggregate.register(new CatInformation('nameB')),
      CatAggregate.register(new CatInformation('nameC')),
    ];
    (queries.ask as jest.Mock).mockImplementationOnce(() => new FindAllCatsQueryResult(aggregates));

    await request(application.getHttpServer())
      .get('/')
      .expect(200);

    expect(queries.ask).toHaveBeenCalledWith(new FindAllCats());
  });
});
