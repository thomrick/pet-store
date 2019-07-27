import { Query, Resolver } from '@nestjs/graphql';

@Resolver('Cat')
export class CatResolver {
  @Query()
  public cats(): any[] {
    return [];
  }
}
