import { CatId } from './cat-id';
import { CatModel } from './cat.model';

describe('CatModel', () => {
  let model: CatModel;

  beforeEach(() => {
    model = new CatModel();
  });

  it('should create a model with an empty', () => {
    expect(model.id).toBeUndefined();
    expect(model.name).toBeUndefined();
    expect(model.isAdopted).toBeFalsy();
  });

  it('should apply register', () => {
    const id = CatId.create();
    const name = 'name';

    model.state().applyRegister(id, name);

    expect(model.id).toEqual(id);
    expect(model.name).toEqual(name);
    expect(model.isAdopted).toBeFalsy();
  });

  it('should apply adopt', () => {
    const id = CatId.create();
    const name = 'name';
    model.state().applyRegister(id, name);

    model.state().applyAdopt();

    expect(model.isAdopted).toBeTruthy();
  });
});
