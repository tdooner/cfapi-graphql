import ClientOAuth2 from 'client-oauth2';
import React, { Component } from 'react';

const { ListBrigadesComponent } = require('../__generated__/types');

const githubAuth = new ClientOAuth2({
  clientId: '910420dba3f7db2cc4e0',
  authorizationUri: 'https://github.com/login/oauth/authorize',
  redirectUri: 'http://localhost:3000/oauth/callback',
  scopes: ['user:email'],
});

class HomePage extends Component<{
  user: any // TODO: Use GetCurrentUserCurrentUser here somehow???
}>{
  handleLoginClick() {
    window.location.href = githubAuth.token.getUri();
  }

  render() {
    return (
      <div className="App">
        {this.props.user ?
          <div>Logged in as {this.props.user.email}</div> :
          <a href='#' onClick={this.handleLoginClick}>Log in with oauth</a>}

        <h1>Brigade List</h1>

        <ListBrigadesComponent>
          {/* TODO: This used to work, why did it break?????? */}
          {({ loading, error, data }: { loading: any, error: any, data: any }) => {
            if (loading) return 'Loading...';
            if (error) return 'Error: ' + error;
            if (!data) {
              return 'No brigades found!'
            }
            return data.listBrigades.map((brigade: any) => <div key={brigade.slug}>{brigade.name}</div>);
          }}
        </ListBrigadesComponent>
      </div>
    );
  }
}

export default HomePage;
