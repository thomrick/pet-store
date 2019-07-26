export class CatDto {
  public readonly id: string;
  public readonly name: string;
  public readonly adopted: boolean;

  constructor(id: string, name: string, adopted: boolean) {
    this.id = id;
    this.name = name;
    this.adopted = adopted;
  }
}
