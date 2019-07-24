import { CatAlreadyAdoptedException } from '../exceptions';
import { CatId, CatModel } from '../model';
import { CatAggregate } from './cat.aggregate';

describe('CatAggregate', () => {
  const name: string = 'name';
  let aggregate: CatAggregate;

  beforeEach(() => {
    aggregate = CatAggregate.register(name);
  });

  it('should register a new aggregate', () => {
    const model = aggregate.model;
    expect(model).toBeInstanceOf(CatModel);
    expect(model.id).toBeInstanceOf(CatId);
    expect(model.name).toEqual(name);
    expect(aggregate.model.isAdopted).toBeFalsy();
  });

  it('should adopt the cat', () => {
    aggregate.adopt();

    expect(aggregate.model.isAdopted).toBeTruthy();
  });

  it('should throw an error caused by cat already adopted', () => {
    aggregate.adopt();

    expect(() => aggregate.adopt()).toThrow(CatAlreadyAdoptedException);
  });
});
