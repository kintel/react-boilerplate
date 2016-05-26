import React from 'react';
import {TableInspector} from 'react-inspector';

const Small = ({onClick, _id, optionalKey, someString}) => {
  return (
    <li onClick={onClick}>
      {_id} {optionalKey} {someString}
    </li>
  );
};

Small.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  optionalKey: React.PropTypes.string.isRequired
};

const SmallList = ({smallItems, onSmallClick}) => {
  return <TableInspector data={smallItems}/>;
};

export default SmallList;
