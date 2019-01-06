import ClientOAuth2 from 'client-oauth2';
import React, { Component } from 'react';

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
        <a href='#' onClick={this.handleLoginClick}>Log in with oauth</a>
      </div>
    );
  }
}

export default HomePage;
