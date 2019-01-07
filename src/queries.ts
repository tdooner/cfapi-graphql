import gql from 'graphql-tag';

export const ListBrigadesQuery = gql`
query ListBrigades {
  listBrigades {
    name
    slug
    website
    city
    state
    region
    latitude
    longitude
    tags
    links {
      meetup
      facebook
      twitter
      github
      rss
    }
    last_updated
  }
}
`;
