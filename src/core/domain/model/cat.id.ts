import uuid from 'uuid/v1';

export class CatId {
  public readonly value: string;

  public static create(): CatId {
    return new CatId(uuid());
  }

  private constructor(value: string) {
    this.value = value;
  }
}
