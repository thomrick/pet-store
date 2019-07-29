import { CatAggregate } from '../../domain';
import { IQueryResult } from './query-result.interface';

export class FindAllCatsQueryResult implements IQueryResult {
  public readonly data: CatAggregate[];

  constructor(data: CatAggregate[]) {
    this.data = data;
  }
}
