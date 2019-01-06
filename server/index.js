const { Sequelize } = require('sequelize');

const { ApolloServer, gql } = require('apollo-server');

const graphqlApiDefinition = require('../graphql-api-definition');

/*
 * Models and stuff
 */
const db = new Sequelize('cfapi-graphql', null, null, {
  dialect: 'sqlite',
  storage: 'cfapi-graphql.sqlite3',
});

const User = db.define('user', {
  // TODO: Store non-primary email addresses in here too!
  email: { type: Sequelize.STRING },
  github_access_token: { type: Sequelize.STRING },
  github_access_token_timestamp: { type: Sequelize.DATE },
}, {
  underscored: true,
  indexes: [
    { unique: true, fields: ['email'] },
  ],
});

const Session = db.define('session', {
  uuid: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4 },
}, {
  underscored: true,
  indexes: [
    { unique: true, fields: ['uuid'] },
  ],
});

User.hasMany(Session);



const github = require('octonode');
github.auth.config({
  id: process.env.GITHUB_OAUTH_CLIENT_ID,
  secret: process.env.GITHUB_OAUTH_CLIENT_SECRET,
});


// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {

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
