import { IQuery } from '../queries/query.interface';
import { IQueryResult } from '../query-results';

export interface IQueryHandler {
  handle(query: IQuery): IQueryResult;
  subscribe(): string;
}
