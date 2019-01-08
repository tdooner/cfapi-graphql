import React from 'react';

import {
  GetCurrentUserComponent,
  GetCurrentUserCurrentUser
} from './__generated__/types';

type CurrentUser = {
  user: GetCurrentUserCurrentUser | null | undefined,
  handleLogout: () => void,
}

const handleLogout = () => {
  window.localStorage.removeItem('sessionId');
  window.location.reload();
};

export const UserContext = React.createContext<CurrentUser>({ user: null, handleLogout });
export class CreateUserContext extends React.Component<{ sessionId: string | null | undefined }>{
  render() {
    return (
      <GetCurrentUserComponent variables={{ sessionId: this.props.sessionId }}>
        {({ loading, error, data }) => (
          <UserContext.Provider value={{ user: data && data.currentUser, handleLogout }}>
            {this.props.children}
          </UserContext.Provider>
          )}
      </GetCurrentUserComponent>
    );
  }
}
