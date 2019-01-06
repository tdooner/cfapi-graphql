import React, { Component } from 'react';
import logo from './logo.svg';
import ClientOAuth2 from 'client-oauth2';
import './App.css';

const githubAuth = new ClientOAuth2({
  clientId: '910420dba3f7db2cc4e0',
  authorizationUri: 'https://github.com/login/oauth/authorize',
  redirectUri: 'http://localhost/oauth/callback',
  scopes: ['user:email'],
});

class App extends Component {
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

export default App;
