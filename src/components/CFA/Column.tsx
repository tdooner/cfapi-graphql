import React from 'react';
import classnames from 'classnames';

const CLASS_NAME_MAP:{ [number: number]: string } = {
  1: 'one-twelfth',
  2: 'one-sixth',
  3: 'one-fourth',
  4: 'one-third',
  5: 'five-twelfths',
  6: 'one-half',
  7: 'seven-twelfths',
  8: 'two-thirds',
  9: 'three-fourths',
  10: 'five-sixths',
  11: 'eleven-twelfths',
  12: 'one-whole',
};

type ColumnProps = {
  width: number
  shift: number
};

const Column: React.SFC<ColumnProps> = (props) => {
  return (
    <div className={classnames({
      ['width-' + CLASS_NAME_MAP[props.width]]: props.width,
      ['shift-' + CLASS_NAME_MAP[props.shift]]: props.shift,
    })}>
      {props.children}
    </div>
  );
};
export default Column;
