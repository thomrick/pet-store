import { Body, Controller, Post } from '@nestjs/common';
import { CatDto } from '../dto';
import { CatsService } from '../services';
import { CreateCatValidator } from '../validators';

@Controller('cats')
export class CatsController {
  private readonly service: CatsService;

  constructor(service: CatsService) {
    this.service = service;
  }

  @Post()
  public create(@Body(CreateCatValidator) dto: CatDto) {
    return this.service.create(dto);
  }
}
