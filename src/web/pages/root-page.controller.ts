import { Controller, Get, Inject, Render } from '@nestjs/common';
import { QUERY_BUS } from '../../bus';
import { FindAllCats, FindAllCatsQueryResult, IQueryBus } from '../../core';

@Controller()
export class RootPageController {
  private readonly queries: IQueryBus;

  constructor(@Inject(QUERY_BUS) queries: IQueryBus) {
    this.queries = queries;
  }

  @Get()
  @Render('index')
  public render(): any {
    const result: FindAllCatsQueryResult = this.queries.ask(new FindAllCats());
    return {
      cats: result.data.map((aggregate) => ({
        id: aggregate.model.id.value,
        name: aggregate.model.name,
        adopted: aggregate.model.isAdopted,
      })),
    };
  }
}
