import uuid from 'uuid/v1';

export class CatId {
  public readonly value: string;

  public static create(): CatId {
    return new CatId(uuid());
  }

  public static from(value: string): CatId {
    return new CatId(value);
  }

  private constructor(value: string) {
    this.value = value;
  }
}
