import { CatInformation } from '../../domain';
import { ICommand } from './command.interface';

export class RegisterCat implements ICommand {
  public readonly name: string = RegisterCat.name;

  public readonly information: CatInformation;

  constructor(information: CatInformation) {
    this.information = information;
  }
}
