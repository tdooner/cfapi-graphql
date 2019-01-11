import ClientOAuth2 from 'client-oauth2';
import React, { Component } from 'react';

import { UserContext } from '../../CurrentUserContext';
import Column from '../CFA/Column';
import GridBox from '../CFA/GridBox';
import Hero from '../CFA/Hero';

type AppLayoutProps = {
};

const githubAuth = new ClientOAuth2({
  clientId: '910420dba3f7db2cc4e0',
  authorizationUri: 'https://github.com/login/oauth/authorize',
  redirectUri: 'http://localhost:3000/oauth/callback',
  scopes: ['user:email'],
});

class AppLayout extends Component {
  handleLoginClick() {
    window.location.href = githubAuth.token.getUri();
  }

  render() {
    return (
      <div className='js-container'>
        <Hero>
          <section className="global-header hero-header">
            <GridBox>
              <Column width={3} shift={9}>
                <UserContext.Consumer>
                  {({ user, handleLogout }) => (
                    user ?
                      <div>{user.email} <a onClick={handleLogout} href='#'>log out</a></div> :
                      <a href='#' onClick={this.handleLoginClick}>log in with github</a>
                  )}
                </UserContext.Consumer>
              </Column>
            </GridBox>
          </section>
        </Hero>

        {this.props.children}
      </div>
    );
  }
};
export default AppLayout;
