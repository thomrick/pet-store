import { CatAggregate, CatId, CatInformation, CatRegistered, ICatEvent, ICatRepository } from '../../../domain';
import { InMemoryCatRepository } from './in-memory.cat-repository';

describe('InMemoryCatRepository', () => {
  it('should save aggregate in the database', () => {
    const information = new CatInformation('name');
    const aggregate = CatAggregate.register(information);
    const database: Map<CatId, ICatEvent[]> = new Map();
    const repository: ICatRepository = new InMemoryCatRepository(database);

    repository.save(aggregate);

    expect(database.get(aggregate.model.id)).toContainEqual(new CatRegistered(aggregate.model.id, information));
  });

  it('should return an aggregate by its id', () => {
    const information = new CatInformation('name');
    const aggregate = CatAggregate.register(information);
    const database: Map<CatId, ICatEvent[]> = new Map();
    database.set(aggregate.model.id, aggregate.uncommittedChanges);
    const repository: ICatRepository = new InMemoryCatRepository(database);

    const found: CatAggregate | null = repository.get(aggregate.model.id);

    expect(found).toEqual(aggregate);
  });

  it('should return null when aggregate does not exist', () => {
    const id = CatId.create();
    const database: Map<CatId, ICatEvent[]> = new Map();
    const repository: ICatRepository = new InMemoryCatRepository(database);

    const found: CatAggregate | null = repository.get(id);

    expect(found).toEqual(null);
  });
});
