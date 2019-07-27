import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

@Module({
  imports: [
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
})
export class GraphApiModule {}
