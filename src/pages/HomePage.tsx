import ClientOAuth2 from 'client-oauth2';
import React, { Component } from 'react';

import { ListBrigadesComponent } from '../__generated__/types';

const githubAuth = new ClientOAuth2({
  clientId: '910420dba3f7db2cc4e0',
  authorizationUri: 'https://github.com/login/oauth/authorize',
  redirectUri: 'http://localhost:3000/oauth/callback',
  scopes: ['user:email'],
});

class HomePage extends Component {
  handleLoginClick() {
    window.location.href = githubAuth.token.getUri();
  }

  render() {
    return (
      <div className="App">
        <ListBrigadesComponent>
          {({ loading, error, data }) => {
            if (loading) return 'Loading...';
            if (error) return 'Error: ' + error;
            if (!data) {
              return 'No brigades found!'
            }
            return data.listBrigades.map(brigade => <div key={brigade.slug}>{brigade.name}</div>);
          }}
        </ListBrigadesComponent>

        <a href='#' onClick={this.handleLoginClick}>Log in with oauth</a>
      </div>
    );
  }
}

export default HomePage;
