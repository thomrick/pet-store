import { ICatRepository } from '../../domain';
import { FindOneCatById } from '../queries';
import { FindOneCatQueryResult } from '../query-results';
import { IQueryHandler } from './query-handler.interface';

export class FindOneCatByIdQueryHandler implements IQueryHandler {
  private readonly repository: ICatRepository;

  constructor(repository: ICatRepository) {
    this.repository = repository;
  }

  public handle(query: FindOneCatById): FindOneCatQueryResult {
    return new FindOneCatQueryResult(this.repository.get(query.id));
  }

  public subscribe(): string {
    return FindOneCatById.name;
  }
}
