import React from 'react';

type Props = {
  code: string | undefined,
};

const OAuthCallback: React.SFC<Props> = (props) => {
  return (
    <div>logged in! code: {props.code}</div>
  );
}

export default OAuthCallback;
