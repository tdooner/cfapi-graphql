import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { ApolloProvider, Mutation } from 'react-apollo';
import { Route, Router } from 'react-router-dom';
import React from 'react';
import queryString from 'query-string';

import createBrowserHistory from 'history/createBrowserHistory';
import gql from 'graphql-tag';

import HomePage from './pages/HomePage';
import OAuthCallback from './pages/OAuthCallback';

const history = createBrowserHistory();

const getCodeFromQueryString = () => {
  // todo: handle errors here
  const parsed = queryString.parse(location.search);

  if (Array.isArray(parsed.code)) {
    return parsed.code[0];
  } else {
    return parsed.code;
  }
};

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:4000/graphql' }),
  cache: new InMemoryCache(),
});

const createSessionMutation = gql`
mutation CreateSession($githubCode: String) {
  createSession(githubCode: $githubCode) {
    uuid
  }
}
`;

export default function App() {
  return (
    <Router history={history}>
      <ApolloProvider client={client}>
        <Route exact path="/oauth/callback" render={props => (
          <Mutation mutation={createSessionMutation}>
            {(createSession, { data }) => (
              <OAuthCallback
                handleCodeReceived={createSession}
                code={getCodeFromQueryString()}
              />
            )}
          </Mutation>
        )} />

        <Route exact path="/" component={HomePage} />
      </ApolloProvider>
    </Router>
  );
};
