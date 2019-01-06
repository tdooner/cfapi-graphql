const { ApolloServer } = require('apollo-server');
const github = require('octonode');

const { Brigade, Session, User, db } = require('../db');
const graphqlApiDefinition = require('../graphql-api-definition');

github.auth.config({
  id: process.env.GITHUB_OAUTH_CLIENT_ID,
  secret: process.env.GITHUB_OAUTH_CLIENT_SECRET,
});

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {
    listBrigades: () => Brigade.findAll(),
  },

  Mutation: {
    createSession: (_, { githubCode }) => {
      console.log('code: ', githubCode);
      return new Promise((resolve) => {
        github.auth.login(githubCode, (err, token) => {
          console.log('got access token: ', token);
          const githubClient = github.client(token);
          githubClient.me().emails((err2, body) => {
            const primaryEmail = body.find(e => e.primary).email;
            console.log('creating user with email:', primaryEmail);
            User.findOrCreate({ where: { email: primaryEmail } }).spread((user) => {
              user.update({
                github_access_token: token,
                github_access_token_timestamp: new Date(),
              });

              Session.create({ user }).then((session) => {
                resolve({ uuid: session.uuid, user });
              });
            });
          });
        });
      });
    },
  },
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs: graphqlApiDefinition, resolvers });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
db.sync().then(() => {
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
});
