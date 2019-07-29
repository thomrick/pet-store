import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  typePaths: [
    join(__dirname, '../..', 'graphql/**/*.gql'),
  ],
  path: join(__dirname, 'graphql.ts'),
  outputAs: 'class',
});
