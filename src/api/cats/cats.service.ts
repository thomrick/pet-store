import { Injectable } from '@nestjs/common';
import { CatInformation, RegisterCatHandler } from '../../core';
import { CreateCatDto } from './dto';

@Injectable()
export class CatsService {
  private readonly registrator: RegisterCatHandler;

  constructor(registrator: RegisterCatHandler) {
    this.registrator = registrator;
  }

  public create(dto: CreateCatDto) {
    const information = new CatInformation(dto.name);
    this.registrator.registerCatWhith(information);
  }
}
