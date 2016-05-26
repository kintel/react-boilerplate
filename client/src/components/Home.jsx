import React from 'react';
import {connect} from 'react-redux';
import {Jumbotron, Button} from 'react-bootstrap';
import {Link} from 'react-router';
import {login} from '../modules/auth';
const logo = require('../../images/logo.svg');

const StatelessHome = ({login, isLoggedIn}) => {
  return <Jumbotron style={{
    backgroundColor: "transparent",
    textAlign: "center",
    padding: "30px 30px"
  }}>
    <img src={logo} alt="BoilerPlate" width="100px"/>
    <h1 style={{fontWeight: "bold"}}>BoilerPlate</h1>
    {isLoggedIn ? <p>Welcome</p> : <p><Button bsStyle="success" onClick={login}>Login</Button></p>}
  </Jumbotron>;
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.user
  };
};
const mapDispatchToProps = {
  login
};


const Home = connect(mapStateToProps, mapDispatchToProps)(StatelessHome);

module.exports = Home;
