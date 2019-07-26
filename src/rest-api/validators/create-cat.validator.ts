import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { CatDto } from '../dto';

@Injectable()
export class CreateCatValidator implements PipeTransform<CatDto, CatDto> {
  public transform(dto: CatDto): CatDto {
    if (!dto.name) {
      throw new BadRequestException();
    }
    return dto;
  }
}
