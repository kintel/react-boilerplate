import React from 'react';
import {TableInspector} from 'react-inspector';

const Large = ({onClick, _id, field1, status}) => {
  return (
    <li onClick={onClick}>
      {_id} {field1} {status}
    </li>
  );
};

Large.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  _id: React.PropTypes.string.isRequired,
  field1: React.PropTypes.string.isRequired,
  status: React.PropTypes.string.isRequired
};

const LargeList = ({largeItems, onLargeClick}) => {
  return <TableInspector data={largeItems}/>;
};

export default LargeList;
