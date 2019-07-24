import { CatAggregate } from './aggregate';
import { CatNotFoundException } from './exceptions';
import { CatId } from './model';
import { ICatRepository } from './ports';

export class AdoptCatHandler {
  private readonly repository: ICatRepository;

  constructor(repository: ICatRepository) {
    this.repository = repository;
  }

  public adoptCat(id: CatId): void {
    const aggregate: CatAggregate | null = this.repository.get(id);
    if (aggregate === null) {
      throw new CatNotFoundException(id);
    }
    aggregate.adopt();
    this.repository.save(aggregate);
  }
}
