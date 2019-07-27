import { INestApplication, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request, { Response } from 'supertest';
import { CatAggregate, CatInformation } from '../../../core';
import { CatDto } from '../../dto';
import { CatsService } from '../services';
import { CatsController } from './cats.controller';

describe('CatsController', () => {
  let application: INestApplication;
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
      findOneById: jest.fn(),
      findAll: jest.fn(),
    })
    .compile();
    application = module.createNestApplication();
    await application.init();
    service = module.get(CatsService);
  });

  afterEach(async () => {
    return application.close();
  });

  it('POST /cats create a new cat', async () => {
    const dto = CatDto.with('name');

    return request(application.getHttpServer())
      .post('/cats')
      .send(dto)
      .expect(201)
      .then(() => {
        expect(service.create).toHaveBeenCalledWith(dto);
      });
  });

  it('POST /cats throw Bad Request Exception when required fields are not provided', async () => {
    return request(application.getHttpServer())
      .post('/cats')
      .send({})
      .expect(400)
      .then(() => {
        expect(service.create).not.toHaveBeenCalled();
      });
  });

  it('GET /cats/:id should return a found cat dto', async () => {
    const aggregate = CatAggregate.register(new CatInformation('name'));
    const dto = CatDto.from(aggregate);
    (service.findOneById as jest.Mock).mockImplementationOnce(() => dto);

    return request(application.getHttpServer())
      .get(`/cats/${aggregate.model.id.value}`)
      .expect(200)
      .then((response: Response) => {
        expect(service.findOneById).toHaveBeenCalledWith(aggregate.model.id.value);
        expect(response.body).toEqual(dto);
      });
  });

  it('GET /cats/:id throw a Not Found exception when cat by id is not found', async () => {
    (service.findOneById as jest.Mock).mockImplementationOnce(() => {
      throw new NotFoundException();
    });

    return request(application.getHttpServer())
      .get(`/cats/fake-id`)
      .expect(404);
  });

  it('GET /cats shoud return all cats', async () => {
    (service.findAll as jest.Mock).mockImplementationOnce(() => []);

    return request(application.getHttpServer())
      .get('/cats')
      .expect(200)
      .then((response: Response) => {
        expect(service.findAll).toHaveBeenCalled();
        expect(response.body).toEqual([]);
      });
  });
});
