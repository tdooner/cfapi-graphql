import React from 'react';

type GridboxProps = {
};

const Gridbox: React.SFC<GridboxProps> = (props) => {
  return (
    <div className='grid-box'>
      {props.children}
    </div>
  );
};
export default Gridbox;
