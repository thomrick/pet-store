import { CatAggregate } from '../../domain';
import { ICommandResult } from './command-result.interface';

export class CatCommandResult implements ICommandResult {
  public readonly data: CatAggregate;

  constructor(data: CatAggregate) {
    this.data = data;
  }
}
