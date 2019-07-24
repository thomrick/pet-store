import { CatId, CatInformation } from '../model';
import { ICatEvent } from './cat-event.interface';

export class CatRegistered implements ICatEvent {
  public readonly name: string = CatRegistered.name;

  public readonly id: CatId;
  public readonly information: CatInformation;

  constructor(id: CatId, information: CatInformation) {
    this.id = id;
    this.information = information;
  }
}
