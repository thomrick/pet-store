import { CatAlreadyAdoptedException } from '../exceptions';
import { CatId, CatModel } from '../model';

export class CatAggregate {
  private _model!: CatModel;

  public static register(name: string): CatAggregate {
    return new CatAggregate(CatId.create(), name);
  }

  private constructor(id: CatId, name: string) {
    this._model = new CatModel().state().applyRegister(id, name);
  }

  public adopt(): void {
    if (this._model.isAdopted) {
      throw new CatAlreadyAdoptedException(this._model.id);
    }
    this._model.state().applyAdopt();
  }

  public get model(): CatModel {
    return this._model;
  }
}
