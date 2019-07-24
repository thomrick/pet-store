import { CatAggregate, CatId, ICatEvent, ICatRepository } from '../../../domain';

export class InMemoryCatRepository implements ICatRepository {
  private readonly database: Map<CatId, ICatEvent[]>;

  constructor(database: Map<CatId, ICatEvent[]> = new Map()) {
    this.database = database;
  }

  public save(aggregate: CatAggregate): void {
    this.database.set(
      aggregate.model.id,
      (this.database.get(aggregate.model.id) || []).concat(aggregate.uncommittedChanges),
    );
  }

  public get(id: CatId): CatAggregate | null {
    const events: ICatEvent[] | undefined = this.database.get(id);
    return !!events ? CatAggregate.rebuild(events) : null;
  }
}
