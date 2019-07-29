import { CatId } from '../../domain';
import { IQuery } from './query.interface';

export class FindOneCatById implements IQuery {
  public readonly name: string = FindOneCatById.name;

  public readonly id: CatId;

  constructor(id: CatId) {
    this.id = id;
  }
}
