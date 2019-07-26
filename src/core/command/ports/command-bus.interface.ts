import { ICommand } from '../commands';

export interface ICommandBus {
  dispatch(command: ICommand): void;
}
