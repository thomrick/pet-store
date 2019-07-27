import { CatAggregate, CatId, CatInformation, CatRegistered, ICatEvent, ICatRepository } from '../../../core';
import { InMemoryCatRepository } from './in-memory.cat-repository';

describe('InMemoryCatRepository', () => {
  let database: Map<CatId, ICatEvent[]>;
  let repository: ICatRepository;

  beforeEach(() => {
    database = new Map();
    repository = new InMemoryCatRepository(database);
  });

  it('should save aggregate in the database', () => {
    const information = new CatInformation('name');
    const aggregate = CatAggregate.register(information);

    repository.save(aggregate);

    expect(database.get(aggregate.model.id)).toContainEqual(new CatRegistered(aggregate.model.id, information));
  });

  it('should return an aggregate by its id', () => {
    const information = new CatInformation('name');
    const aggregate = CatAggregate.register(information);
    database.set(aggregate.model.id, aggregate.uncommittedChanges);

    const found: CatAggregate | null = repository.get(aggregate.model.id);

    expect(found).toEqual(aggregate);
  });

  it('should return null when aggregate does not exist', () => {
    const id = CatId.create();

    const found: CatAggregate | null = repository.get(id);

    expect(found).toEqual(null);
  });

  it('should return all the cats', () => {
    const aggregates = [
      CatAggregate.register(new CatInformation('name1')),
      CatAggregate.register(new CatInformation('name2')),
      CatAggregate.register(new CatInformation('name3')),
    ];
    aggregates.forEach((aggregate) => database.set(aggregate.model.id, aggregate.uncommittedChanges));

    const founds: CatAggregate[] = repository.getAll();

    expect(founds).toEqual(aggregates);
  });
});
