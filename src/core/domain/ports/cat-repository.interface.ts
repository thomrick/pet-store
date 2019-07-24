import { CatAggregate } from '../aggregate/cat.aggregate';
import { CatId } from '../model';

export interface ICatRepository {
  save(aggregate: CatAggregate): void;
  get(id: CatId): CatAggregate | null;
}
