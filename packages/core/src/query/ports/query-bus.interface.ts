import { IQuery } from '../queries/query.interface';
import { IQueryResult } from '../query-results';

export interface IQueryBus {
  ask(query: IQuery): IQueryResult;
}
