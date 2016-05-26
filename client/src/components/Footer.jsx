import React from 'react';
import {Well} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

const Footer = ({clientVersion, serverVersion}) => {
  return <Well style={{margin: 0, position: "absolute", left: 0, bottom: 0, width: "100%"}}
               className="text-center">
    <p className="pull-left">BoilerPlate</p>
    <p style={{color: "#888888"}} className="pull-right">Client version: {clientVersion} - Server version: {serverVersion ? serverVersion : <FontAwesome className="fa-spin" name="spinner"/>}</p>
  </Well>;
};

export default Footer;
