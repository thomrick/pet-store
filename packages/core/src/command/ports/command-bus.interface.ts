import { ICommandResult } from '../command-results';
import { ICommand } from '../commands';

export interface ICommandBus {
  dispatch(command: ICommand): ICommandResult;
}
