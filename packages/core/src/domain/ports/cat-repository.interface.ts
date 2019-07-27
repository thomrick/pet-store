import { CatAggregate } from '../aggregate';
import { CatId } from '../model';

export interface ICatRepository {
  save(aggregate: CatAggregate): void;
  get(id: CatId): CatAggregate | null;
  getAll(): CatAggregate[];
}
