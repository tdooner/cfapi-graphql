import gql from 'graphql-tag';

export const CreateSession = gql`
mutation CreateSession($githubCode: String) {
  createSession(githubCode: $githubCode) {
    uuid
  }
}
`;
