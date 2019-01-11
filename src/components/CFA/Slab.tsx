import React from 'react';
import classnames from 'classnames';

type SlabProps = {
  tight?: boolean
};

const Slab: React.SFC<SlabProps> = (props) => {
  return (
    <div className={classnames({
      'tight': props.tight
    })}>
      {props.children}
    </div>
  );
};
export default Slab;
