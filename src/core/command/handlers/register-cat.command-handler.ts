import { CatAggregate, ICatRepository } from '../../domain';
import { CatCommandResult } from '../command-results';
import { RegisterCat } from '../commands';
import { ICommandHandler } from './command-handler.interface';

export class RegisterCatCommandHandler implements ICommandHandler {
  private readonly repository: ICatRepository;

  constructor(repository: ICatRepository) {
    this.repository = repository;
  }

  public handle(command: RegisterCat): CatCommandResult {
    const aggregate = CatAggregate.register(command.information);
    this.repository.save(aggregate);
    return new CatCommandResult(aggregate);
  }

  public subscribe(): string {
    return RegisterCat.name;
  }
}
