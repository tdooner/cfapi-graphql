import gql from 'graphql-tag';

export const GetCurrentUser = gql`
query GetCurrentUser($sessionId: String) {
  currentUser(sessionId: $sessionId) {
    id
    email
  }
}
`;
