import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Observable, of } from 'rxjs';
import { ICommand, ICommandHandler, RegisterCat, RegisterCatCommandHandler } from '../../core';

@Controller()
export class AppController {
  private readonly registrator: ICommandHandler;

  constructor(registrator: RegisterCatCommandHandler) {
    this.registrator = registrator;
  }

  @MessagePattern(RegisterCat.name)
  public register(command: ICommand): Observable<void> {
    return of(this.registrator.handle(command));
  }
}
