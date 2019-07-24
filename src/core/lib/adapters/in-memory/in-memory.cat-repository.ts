import { CatAggregate, CatId, ICatRepository } from '../../../domain';

export class InMemoryCatRepository implements ICatRepository {
  public save(aggregate: CatAggregate): void {
    throw new Error('Method not implemented.');
  }

  public get(id: CatId): CatAggregate | null {
    throw new Error('Method not implemented.');
  }
}
