import { CatAggregate, CatModel } from '../../core';

export class CatDto {
  public readonly id?: string;
  public readonly name?: string;
  public readonly adopted?: boolean;

  public static with(name: string): CatDto {
    return new CatDto(undefined, name, undefined);
  }

  public static from(aggregate: CatAggregate): CatDto {
    const model: CatModel = aggregate.model;
    return new CatDto(
      model.id.value,
      model.name,
      model.isAdopted,
    );
  }

  private constructor(id?: string, name?: string, adopted?: boolean) {
    this.id = id;
    this.name = name;
    this.adopted = adopted;
  }
}
