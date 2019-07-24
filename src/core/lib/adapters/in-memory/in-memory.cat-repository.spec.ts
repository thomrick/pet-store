import { ICatRepository } from '../../../domain';
import { InMemoryCatRepository } from './in-memory.cat-repository';

describe('InMemoryCatRepository', () => {
  it('can be instantiated', () => {
    const repository: ICatRepository = new InMemoryCatRepository();
  });
});
