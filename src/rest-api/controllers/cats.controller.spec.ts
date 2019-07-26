import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { CatDto } from '../dto';
import { CatsService } from '../services';
import { CatsController } from './cats.controller';

describe('CatsController', () => {
  let server: any;
  let service: CatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [
        CatsController,
      ],
      providers: [
        CatsService,
      ],
    })
    .overrideProvider(CatsService)
    .useValue({
      create: jest.fn(),
    })
    .compile();
    const application: INestApplication = module.createNestApplication();
    await application.init();
    server = application.getHttpServer();
    service = module.get(CatsService);
  });

  it('POST /cats create a new cat', () => {
    const dto = CatDto.with('name');

    return request(server)
      .post('/cats')
      .send(dto)
      .expect(201)
      .then(() => {
        expect(service.create).toHaveBeenCalledWith(dto);
      });
  });

  it('POST /cats throw Bad Request Exception when required fields are not provided', () => {
    return request(server)
      .post('/cats')
      .send({})
      .expect(400)
      .then(() => {
        expect(service.create).not.toHaveBeenCalled();
      });
  });
});
