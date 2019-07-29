import { forwardRef, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { BusModule } from '@pet-store/bus';
import { join } from 'path';
import { CatResolver } from './resolvers';

@Module({
  imports: [
    forwardRef(() => BusModule),
    GraphQLModule.forRoot({
      debug: false,
      playground: true,
      typePaths: [
        join(process.cwd(), 'graphql/**/*.gql'),
      ],
      definitions: {
        path: join(__dirname, 'graphql.ts'),
        outputAs: 'class',
      },
    }),
  ],
  providers: [
    CatResolver,
  ],
})
export class GraphApiModule {}
