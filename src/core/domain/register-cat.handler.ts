import { CatAggregate } from './aggregate';
import { CatInformation } from './model';
import { ICatRepository } from './ports';

export class RegisterCatHandler {
  private readonly repository: ICatRepository;

  constructor(repository: ICatRepository) {
    this.repository = repository;
  }

  public registerCatWhith(information: CatInformation): void {
    const aggregate = CatAggregate.register(information);
    this.repository.save(aggregate);
  }
}
