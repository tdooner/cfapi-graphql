import { Mutation } from 'react-apollo';
import React, { Component } from 'react';
import gql from 'graphql-tag';

type Props = {
  code: string | undefined,
  handleCodeReceived(mutationOptions: object): any,
};

class OAuthCallback extends Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.code) {
      this.props.handleCodeReceived({ variables: { githubCode: this.props.code }});
    } else {
      throw new Error('Did not get github code');
    }
  }

  render() {
    return (
      <div>logging in...</div>
    );
  }
}

export default OAuthCallback;
