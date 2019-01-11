import React from 'react';

type HeroProps = {
};

const Hero: React.SFC<HeroProps> = (props) => {
  return (
    <div className='hero'>
      {props.children}
    </div>
  );
};
export default Hero;
