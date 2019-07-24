import { CatId, CatModel } from '../model';
import { CatAggregate } from './cat.aggregate';

describe('CatAggregate', () => {
  it('should register a new aggregate', () => {
    const name = 'name';

    const aggregate = CatAggregate.register(name);

    const model = aggregate.model;
    expect(model).toBeInstanceOf(CatModel);
    expect(model.id).toBeInstanceOf(CatId);
    expect(model.name).toEqual(name);
    expect(aggregate.model.isAdopted).toBeFalsy();
  });

  it('should adopt the cat', () => {
    const name = 'name';

    const aggregate = CatAggregate.register(name);

    aggregate.adopt();

    expect(aggregate.model.isAdopted).toBeTruthy();
  });
});
