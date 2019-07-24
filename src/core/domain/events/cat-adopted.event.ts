import { CatId } from '../model';
import { ICatEvent } from './cat-event.interface';

export class CatAdopted implements ICatEvent {
  public readonly name: string = CatAdopted.name;

  public readonly id: CatId;

  constructor(id: CatId) {
    this.id = id;
  }
}
