import { Body, Controller, Get, Inject, NotFoundException, Param, Post } from '@nestjs/common';
import { COMMAND_BUS, QUERY_BUS } from '../../../bus';
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
} from '../../../core';
import { CatDto } from '../../dto';
import { CreateCatValidator } from '../validators';

@Controller('cats')
export class CatsController {
  private readonly commands: ICommandBus;
  private readonly queries: IQueryBus;

  constructor(@Inject(COMMAND_BUS) commands: ICommandBus, @Inject(QUERY_BUS) queries: IQueryBus) {
    this.commands = commands;
    this.queries = queries;
  }

  @Post()
  public create(@Body(CreateCatValidator) dto: CatDto) {
    return this.commands.dispatch(new RegisterCat(new CatInformation(dto.name!)));
  }

  @Get()
  public findAll(): CatDto[] {
    const result: FindAllCatsQueryResult = this.queries.ask(new FindAllCats());
    return result.data.map((aggregate) => CatDto.from(aggregate));
  }

  @Get(':id')
  public findOneById(@Param('id') id: string): CatDto {
    const result: FindOneCatQueryResult = this.queries.ask(new FindOneCatById(CatId.from(id)));
    if (result.data === null) {
      throw new NotFoundException();
    }
    return CatDto.from(result.data);
  }
}
