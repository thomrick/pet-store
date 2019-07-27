import { ICommandResult } from '../command-results';
import { ICommand } from '../commands';

export interface ICommandHandler {
  handle(command: ICommand): ICommandResult;
  subscribe(): string;
}
