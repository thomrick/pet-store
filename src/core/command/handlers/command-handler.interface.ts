import { ICommand } from '../commands';

export interface ICommandHandler {
  handle(command: ICommand): void;
  subscribe(): string;
}
