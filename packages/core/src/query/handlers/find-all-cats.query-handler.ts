import { ICatRepository } from '../../domain';
import { FindAllCats } from '../queries';
import { FindAllCatsQueryResult } from '../query-results';
import { IQueryHandler } from './query-handler.interface';

export class FindAllCatsQueryHandler implements IQueryHandler {
  private readonly repository: ICatRepository;

  constructor(repository: ICatRepository) {
    this.repository = repository;
  }

  public handle(_: FindAllCats): FindAllCatsQueryResult {
    return new FindAllCatsQueryResult(this.repository.getAll());
  }

  public subscribe(): string {
    return FindAllCats.name;
  }
}
