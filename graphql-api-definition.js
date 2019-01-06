const { gql } = require('apollo-server');

module.exports = gql`
  type User {
    id: Int
    email: String
  }

  type UserSession {
    uuid: String
    user: User
  }

  type Query {
    session: [UserSession],
  }

  type Mutation {
    createSession(githubCode: String): UserSession
  }
`;
