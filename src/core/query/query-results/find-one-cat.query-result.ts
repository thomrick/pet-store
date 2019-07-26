import { CatAggregate } from '../../domain';
import { IQueryResult } from './query-result.interface';

export class FindOneCatQueryResult implements IQueryResult {
  private readonly data: CatAggregate | null;

  constructor(data: CatAggregate | null) {
    this.data = data;
  }

  public getData(): CatAggregate | null {
    return this.data;
  }
}
