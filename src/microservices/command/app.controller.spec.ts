import { INestMicroservice } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { CatInformation, RegisterCat, RegisterCatCommandHandler } from '../../core';
import { AppModule } from './app.module';

describe('CommandMicroserviceController', () => {
  let application: INestMicroservice;
  let client: ClientProxy;

  let registrator: RegisterCatCommandHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
      ],
    })
    .overrideProvider(RegisterCatCommandHandler)
    .useValue({
      handle: jest.fn(),
    })
    .compile();
    application = module.createNestMicroservice({
      transport: Transport.TCP,
    });
    await application.listenAsync();
    client = ClientProxyFactory.create({
      transport: Transport.TCP,
    });
    registrator = application.get(RegisterCatCommandHandler);
  });

  afterEach(async () => {
    return application.close();
  });

  it('should register a new cat', async () => {
    const command = new RegisterCat(new CatInformation('name'));

    await client.send(command.name, command).toPromise();

    expect(registrator.handle).toHaveBeenCalledWith(command);
  });
});
