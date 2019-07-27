import { Inject, NotFoundException } from '@nestjs/common';
import { COMMAND_BUS, QUERY_BUS } from '../../bus';
import {
  CatId,
  CatInformation,
  FindAllCats,
  FindAllCatsQueryResult,
  FindOneCatById,
  FindOneCatQueryResult,
  ICommandBus,
  IQueryBus,
  RegisterCat,
} from '../../core';
import { CatDto } from '../dto';

export class CatsService {
  private readonly commands: ICommandBus;
  private readonly queries: IQueryBus;

  constructor(
    @Inject(COMMAND_BUS) commands: ICommandBus,
    @Inject(QUERY_BUS) queries: IQueryBus,
  ) {
    this.commands = commands;
    this.queries = queries;
  }

  public create(dto: CatDto) {
    const command = new RegisterCat(new CatInformation(dto.name!));
    this.commands.dispatch(command);
  }

  public findOneById(id: string): CatDto {
    const result: FindOneCatQueryResult = this.queries.ask(new FindOneCatById(CatId.from(id)));
    if (result.data === null) {
      throw new NotFoundException();
    }
    return CatDto.from(result.data);
  }

  public findAll(): CatDto[] {
    const result: FindAllCatsQueryResult = this.queries.ask(new FindAllCats());
    return result.data.map((aggregate) => CatDto.from(aggregate));
  }
}
