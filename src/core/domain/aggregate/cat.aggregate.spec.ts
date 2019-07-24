import { CatRegistered } from '../events';
import { CatAlreadyAdoptedException } from '../exceptions';
import { CatId, CatInformation, CatModel } from '../model';
import { CatAggregate } from './cat.aggregate';

describe('CatAggregate', () => {
  let information: CatInformation;
  let aggregate: CatAggregate;

  beforeEach(() => {
    information = new CatInformation('name');
    aggregate = CatAggregate.register(information);
  });

  it('should register a new aggregate', () => {
    const model = aggregate.model;
    expect(model).toBeInstanceOf(CatModel);
    expect(model.id).toBeInstanceOf(CatId);
    expect(model.name).toEqual(information.name);
    expect(aggregate.model.isAdopted).toBeFalsy();
  });

  xit('should add a cat registered event', () => {
    expect(aggregate.uncommittedChanges).toContainEqual(new CatRegistered(aggregate.model.id, information));
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
