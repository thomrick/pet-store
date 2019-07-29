import { CatAdopted, CatRegistered } from '../events';
import { CatId } from './cat.id';
import { CatInformation } from './cat.information';
import { CatModel } from './cat.model';

describe('CatModel', () => {
  const id = CatId.create();
  const information = new CatInformation('name');

  let model: CatModel;

  beforeEach(() => {
    model = new CatModel();
  });

  it('should create a model with an empty state', () => {
    expect(model.id).toBeUndefined();
    expect(model.name).toBeUndefined();
    expect(model.isAdopted).toBeFalsy();
  });

  it('should apply register', () => {
    model.state().apply(new CatRegistered(id, information));

    expect(model.id).toEqual(id);
    expect(model.name).toEqual(information.name);
    expect(model.isAdopted).toBeFalsy();
  });

  it('should apply adopt', () => {
    model.state().apply(new CatRegistered(id, information));

    model.state().apply(new CatAdopted(id));

    expect(model.isAdopted).toBeTruthy();
  });
});
