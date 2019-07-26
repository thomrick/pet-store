export class CreateCatDto {
  public readonly name: string;

  constructor(name: string) {
    this.name = name;
  }
}
