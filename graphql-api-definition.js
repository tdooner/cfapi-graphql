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

  enum BrigadeRegion {
    Northeast
    Midwest
    South
    West
  }

  type BrigadeLinks {
    facebook: String
    twitter: String
    meetup: String
    github: String
    rss: String
  }

  type Brigade {
    slug: String!
    name: String!
    website: String

    city: String
    state: String
    region: BrigadeRegion
    latitude: Float
    longitude: Float

    tags: [String]!
    links: BrigadeLinks
    last_updated: Int
  }

  type Query {
    session: [UserSession],
    listBrigades: [Brigade]!,
  }

  type Mutation {
    createSession(githubCode: String): UserSession
  }
`;
