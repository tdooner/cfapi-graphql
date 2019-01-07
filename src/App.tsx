import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { Route, Router } from 'react-router-dom';
import React from 'react';
import queryString from 'query-string';

import createBrowserHistory from 'history/createBrowserHistory';

import HomePage from './pages/HomePage';
import OAuthCallback from './pages/OAuthCallback';

const {
  CreateSessionComponent,
  GetCurrentUserComponent,
} = require('./__generated__/types');

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

export default function App() {
  return (
    <Router history={history}>
      <ApolloProvider client={client}>
        <Route exact path="/oauth/callback" render={props => (
          <CreateSessionComponent>
            {(createSession: (options: object) => any, { data }: { data: any }) => {
              if (data && data.createSession) {
                window.localStorage.setItem('sessionId', data.createSession.uuid);
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

        <Route exact path="/" render={(props) => {
          const sessionId = window.localStorage.getItem('sessionId');
          console.log('sessionId', sessionId);
          let currentUser;
          if (sessionId) {
            return (
              <GetCurrentUserComponent variables={{ sessionId }}>
                {({ loading, error, data }: { loading: any, error: any, data: any }) =>
                  <HomePage {...props} user={data && data.currentUser}/>}
              </GetCurrentUserComponent>
            );
          } else {
            return <HomePage {...props} user={null} />}
          }
        }/>
      </ApolloProvider>
    </Router>
  );
};
