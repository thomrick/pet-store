import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { COMMAND_BUS, QUERY_BUS } from '../../../bus';
import {
  CatCommandResult,
  CatInformation,
  FindAllCats,
  FindAllCatsQueryResult,
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
}
