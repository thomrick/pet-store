import { CatAggregate } from './aggregate';
import { ICatRepository } from './ports';

export class RegisterCatHandler {
  private readonly repository: ICatRepository;

  constructor(repository: ICatRepository) {
    this.repository = repository;
  }

  public registerCatWhith(name: string): void {
    const aggregate = CatAggregate.register(name);
    this.repository.save(aggregate);
  }
}
