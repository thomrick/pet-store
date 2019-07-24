import { CatAdopted, CatRegistered, ICatEvent } from '../events';
import { CatAlreadyAdoptedException } from '../exceptions';
import { CatId, CatInformation, CatModel } from '../model';

export class CatAggregate {
  private _model!: CatModel;
  private _uncommittedChanges: ICatEvent[] = [];

  public static register(information: CatInformation): CatAggregate {
    return new CatAggregate(CatId.create(), information);
  }

  public static rebuild(events: ICatEvent[]): CatAggregate {
    return events.reduce((aggregate, event) => event.apply(aggregate), new CatAggregate());
  }

  private constructor();
  private constructor(id: CatId, information: CatInformation);
  private constructor(id?: CatId, information?: CatInformation) {
    this._model = new CatModel();
    if (!!id && !!information) {
      const event = new CatRegistered(id, information);
      this.apply(event);
      this.save(event);
    }
  }

  public adopt(): void {
    if (this._model.isAdopted) {
      throw new CatAlreadyAdoptedException(this._model.id);
    }
    const event = new CatAdopted(this._model.id);
    this.apply(event);
    this.save(event);
  }

  public get model(): CatModel {
    return this._model;
  }

  public apply(event: ICatEvent): CatAggregate {
    this._model.state().apply(event);
    return this;
  }

  private save(event: ICatEvent): void {
    this._uncommittedChanges.push(event);
  }

  public get uncommittedChanges(): ICatEvent[] {
    return this._uncommittedChanges;
  }
}
