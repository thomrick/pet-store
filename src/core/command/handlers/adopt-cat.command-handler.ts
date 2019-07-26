import { CatAggregate, CatNotFoundException, ICatRepository } from '../../domain';
import { AdoptCat } from '../commands';
import { ICommandHandler } from './command-handler.interface';

export class AdoptCatCommandHandler implements ICommandHandler {
  private readonly repository: ICatRepository;

  constructor(repository: ICatRepository) {
    this.repository = repository;
  }

  public handle(command: AdoptCat): void {
    const aggregate: CatAggregate | null = this.repository.get(command.id);
    if (aggregate === null) {
      throw new CatNotFoundException(command.id);
    }
    aggregate.adopt();
    this.repository.save(aggregate);
  }

  public subscribe(): string {
    return AdoptCat.name;
  }
}
