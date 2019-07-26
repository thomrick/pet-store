import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  public get(property: string): string | undefined {
    return process.env[property];
  }
}
