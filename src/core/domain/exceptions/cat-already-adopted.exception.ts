import { CatId } from '../model';

export class CatAlreadyAdoptedException extends Error {
  constructor(id: CatId) {
    super(`cat ${id.value} alread adopted`);
  }
}
