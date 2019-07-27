import { Inject } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { COMMAND_BUS, QUERY_BUS } from '../../../bus';
import { FindAllCats, FindAllCatsQueryResult, ICommandBus, IQueryBus } from '../../../core';

@Resolver('Cat')
export class CatResolver {
  private readonly commands: ICommandBus;
  private readonly queries: IQueryBus;

  constructor(@Inject(COMMAND_BUS) commands: ICommandBus, @Inject(QUERY_BUS) queries: IQueryBus) {
    this.commands = commands;
    this.queries = queries;
  }

  @Query()
  public cats(): any[] {
    const result: FindAllCatsQueryResult = this.queries.ask(new FindAllCats());
    return result.data;
  }
}
