import { CatAdopted, CatRegistered, ICatEvent } from '../events';
import { CatId } from './cat.id';
import { CatInformation } from './cat.information';

export class CatModel {
  private _id!: CatId;
  private _name!: string;
  private _adopted!: boolean;

  public get id(): CatId {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get isAdopted(): boolean {
    return this._adopted;
  }

  public state() {
    return new class StateApplier {
      private model: CatModel;

      constructor(model: CatModel) {
        this.model = model;
      }

      public apply(event: ICatEvent): CatModel {
        switch (event.name) {
          case CatRegistered.name:
            return this.applyCatRegistered(event as CatRegistered);
          case CatAdopted.name:
            return this.applyCatAdopted(event as CatAdopted);
          default:
            return this.model;
        }
      }

      private applyCatRegistered(event: CatRegistered): CatModel {
        this.model._id = event.id;
        this.model._name = event.information.name;
        this.model._adopted = false;
        return this.model;
      }

      private applyCatAdopted(_: CatAdopted): CatModel {
        this.model._adopted = true;
        return this.model;
      }

      public applyRegister(id: CatId, information: CatInformation): CatModel {
        this.model._id = id;
        this.model._name = information.name;
        this.model._adopted = false;
        return this.model;
      }

      public applyAdopt(): CatModel {
        this.model._adopted = true;
        return this.model;
      }
    }(this);
  }
}
