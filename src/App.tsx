import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { Route, Router } from 'react-router-dom';
import React from 'react';
import queryString from 'query-string';

import createBrowserHistory from 'history/createBrowserHistory';

import { CreateSessionComponent } from './__generated__/types';
import { CreateUserContext } from './CurrentUserContext';
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

const App: React.SFC<{ sessionId: string | null }> = ({ sessionId }) => {
  return (
    <ApolloProvider client={client}>
      <Router history={history}>
        <CreateUserContext sessionId={sessionId}>
          <Route exact path="/oauth/callback" render={props => (
            <CreateSessionComponent>
              {(createSession, {data }) => {
                /* TODO: Move this out of here, ideally into CurrentUserContext.
                 * This needs to be github-specific since the mutation only works for github. */
                if (data && data.createSession) {
                  window.localStorage.setItem('sessionId', data.createSession.uuid || '');
                  window.location.href = '/';
                }
                return (
                  <OAuthCallback
                    handleCodeReceived={createSession}
                    code={getCodeFromQueryString()}
                  />
                );
              }}
            </CreateSessionComponent>
          )} />

          <Route exact path="/" component={HomePage} />
        </CreateUserContext>
      </Router>
    </ApolloProvider>
  );
};

export default App;
