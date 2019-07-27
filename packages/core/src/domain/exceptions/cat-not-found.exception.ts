import { CatId } from '../model';

export class CatNotFoundException extends Error {
  constructor(id: CatId) {
    super(`Cat ${id.value} can not be found`);
  }
}
