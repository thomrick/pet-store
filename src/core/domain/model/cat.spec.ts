import { Cat } from './cat';
import { CatId } from './cat-id';

describe('Cat', () => {
  it('should create a new cat', () => {
    const cat = Cat.with('name');

    expect(cat.getId()).toBeInstanceOf(CatId);
    expect(cat.getName()).toEqual('name');
  });
});
