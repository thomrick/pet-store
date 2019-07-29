import { CatId } from '../../domain';
import { ICommand } from './command.interface';

export class AdoptCat implements ICommand {
  public readonly name: string = AdoptCat.name;

  public readonly id: CatId;

  constructor(id: CatId) {
    this.id = id;
  }
}
