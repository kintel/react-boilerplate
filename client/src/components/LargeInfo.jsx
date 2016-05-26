import React from 'react';

const LargeInfo = ({large, error}) => {
  if (error) {
    return <p style={{color: "red"}}>{error}</p>;
  }
  else if (large) {
    return <ul>
      <li>Large-nr: {large._id}</li>
      <li>Field1: {large.field1}</li>
      <li>Field2: {large.field2}</li>
      <li>Field3: {large.field3}</li>
      <li>Status: {large.status}</li>
      </ul>;
  }
  return null;
};

export default LargeInfo;
