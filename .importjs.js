module.exports = {
  aliases: {
    gql: 'graphql-tag',
  },
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
