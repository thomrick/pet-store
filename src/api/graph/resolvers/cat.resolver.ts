import { Inject, NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { COMMAND_BUS, QUERY_BUS } from '../../../bus';
import {
  CatCommandResult,
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

@Resolver('Cat')
export class CatResolver {
  private readonly commands: ICommandBus;
  private readonly queries: IQueryBus;

  constructor(@Inject(COMMAND_BUS) commands: ICommandBus, @Inject(QUERY_BUS) queries: IQueryBus) {
    this.commands = commands;
    this.queries = queries;
  }

  @Mutation()
  public register(@Args('input') dto: CatDto): CatDto {
    const result: CatCommandResult = this.commands.dispatch(new RegisterCat(new CatInformation(dto.name!)));
    return CatDto.from(result.data);
  }

  @Query()
  public cats(): CatDto[] {
    const result: FindAllCatsQueryResult = this.queries.ask(new FindAllCats());
    return result.data.map((aggregate) => CatDto.from(aggregate));
  }

  @Query()
  public cat(@Args('id') id: string): CatDto {
    const result: FindOneCatQueryResult = this.queries.ask(new FindOneCatById(CatId.from(id)));
    if (result.data === null) {
      throw new NotFoundException();
    }
    return CatDto.from(result.data!);
  }
}
