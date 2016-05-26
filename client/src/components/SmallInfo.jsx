import React from 'react';

const SmallInfo = ({small, error}) => {
  if (error) {
    return <p style={{color: "red"}}>{error}</p>;
  }
  else if (small) {
    return <ul>
      <li>Small-nr: {small._id}</li>
      <li>Optional key: {small.optionalKey}</li>
      <li>Some string: {small.someString}</li>
      <li>Field1: {small.field1}</li>
      {small.field2 ? <li>Field2: {small.field2}</li> : ''}
    {small.field3 ? <li>Field3: {small.field3}</li> : ''}
    </ul>;
  }
  return null;
};

export default SmallInfo;
