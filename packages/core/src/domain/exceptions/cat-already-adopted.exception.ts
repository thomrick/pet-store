import { CatId } from '../model';

export class CatAlreadyAdoptedException extends Error {
  constructor(id: CatId) {
    super(`Cat ${id.value} already adopted`);
  }
}
