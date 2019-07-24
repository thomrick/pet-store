import { CatAlreadyAdoptedException } from '../exceptions';
import { CatId, CatInformation, CatModel } from '../model';

export class CatAggregate {
  private _model!: CatModel;

  public static register(information: CatInformation): CatAggregate {
    return new CatAggregate(CatId.create(), information);
  }

  private constructor(id: CatId, information: CatInformation) {
    this._model = new CatModel().state().applyRegister(id, information);
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
