import { CatAggregate } from '../../domain';
import { IQueryResult } from './query-result.interface';

export class FindOneCatQueryResult implements IQueryResult {
  public readonly data: CatAggregate | null;

  constructor(data: CatAggregate | null) {
    this.data = data;
  }
}
