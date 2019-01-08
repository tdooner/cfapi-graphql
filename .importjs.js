module.exports = {
  aliases: {
    gql: 'graphql-tag',
  },
  declarationKeyword: 'import',
  namedExports: {
    react: [
      'Component',
    ],
    'react-apollo': [
      'Query',
      'Mutation',
    ],
  },
  environments: [
    'node',
    'browser',
  ],
};
