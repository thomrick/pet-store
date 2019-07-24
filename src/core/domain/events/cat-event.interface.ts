import { CatAggregate } from '../aggregate';

export interface ICatEvent {
  readonly name: string;
  apply(aggregate: CatAggregate): CatAggregate;
}
