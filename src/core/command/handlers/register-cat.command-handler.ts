import { CatAggregate, ICatRepository } from '../../domain';
import { RegisterCat } from '../commands';
import { ICommandHandler } from './command-handler.interface';

export class RegisterCatCommandHandler implements ICommandHandler {
  private readonly repository: ICatRepository;

  constructor(repository: ICatRepository) {
    this.repository = repository;
  }

  public handle(command: RegisterCat): void {
    const aggregate = CatAggregate.register(command.information);
    this.repository.save(aggregate);
  }

  public subscribe(): string {
    return RegisterCat.name;
  }
}
