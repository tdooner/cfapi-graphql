import { Route, Router } from 'react-router-dom';
import React from 'react';
import queryString from 'query-string';

import createBrowserHistory from 'history/createBrowserHistory';

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

export default function App() {
  return (
    <Router history={history}>
      <div>
        <Route exact path="/oauth/callback" render={props => (
          <OAuthCallback code={getCodeFromQueryString()} />
        )} />
        <Route exact path="/" component={HomePage} />
      </div>
    </Router>
  );
};
