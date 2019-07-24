import { CatId } from './cat-id';

export class Cat {
  private readonly id: CatId;
  private readonly name: string;

  public static with(name: string): Cat {
    return new Cat(CatId.create(), name);
  }

  private constructor(id: CatId, name: string) {
    this.id = id;
    this.name = name;
  }

  public getId(): any {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }
}
