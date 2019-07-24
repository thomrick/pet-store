import { CatId } from './cat-id';

export class CatModel {
  private _id!: CatId;
  private _name!: string;
  private _adopted!: boolean;

  public get id(): any {
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

      public applyRegister(id: CatId, name: string): CatModel {
        this.model._id = id;
        this.model._name = name;
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