const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const github = require('octonode');
const schedule = require('node-schedule');

const {
  Brigade,
  Session,
  User,
  db,
} = require('../db');
const graphqlApiDefinition = require('../graphql-api-definition');

github.auth.config({
  id: process.env.GITHUB_OAUTH_CLIENT_ID,
  secret: process.env.GITHUB_OAUTH_CLIENT_SECRET,
});

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {
    currentUser: (_, { sessionId }) => Session
      .findOne({ where: { uuid: sessionId } })
      .then(session => session && session.getUser())
      .then(user => user),
    listBrigades: () => Brigade.findAll(),
  },

  Mutation: {
    createSession: (_, { githubCode }) => {
      console.log('code: ', githubCode);
      return new Promise((resolve) => {
        github.auth.login(githubCode, (err, token) => {
          if (err) {
            console.error('error logging in', err.message);
            return;
          }
          console.log('got access token: ', token);
          const githubClient = github.client(token);
          githubClient.me().emails((err2, body) => {
            if (err2) {
              console.error('error getting emails', err2.message);
              return
            }
            const primaryEmail = body.find(e => e.primary).email;
            console.log('creating user with email:', primaryEmail);
            User.findOrCreate({ where: { email: primaryEmail } }).spread((user) => {
              user.update({
                github_access_token: token,
                github_access_token_timestamp: new Date(),
              });

              Session.create({ user_id: user.id }).then((session) => {
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
const app = express();
const server = new ApolloServer({ typeDefs: graphqlApiDefinition, resolvers });

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));

  app.get('/*', (req, res) => {
    res.sendFile('build/index.html');
  });
} else {
  app.get('/', (_, res) => res.redirect(server.graphqlPath));
}

schedule.scheduleJob('* * * * *', function() {
  console.log('minute!');
});

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
db.sync().then(() => {
  const port = process.env.PORT || 4000;

  server.applyMiddleware({ app });
  app.listen(port, () => {
    console.log(`🚀  Server ready on port ${port}!`);
  });
});
