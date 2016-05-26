import React from 'react';
import {connect} from 'react-redux';
import {LinkContainer} from 'react-router-bootstrap';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import {login, logout} from '../modules/auth';

const logo = require('../../images/logo.svg');

const PublicLoginMenu = ({login}) => {
  return (
      <Nav pullRight key="right">
        <NavItem onClick={login}>Login</NavItem>
      </Nav>
  );
};

const LoggedInMenu = ({user, logout}) => {
  return (
      <Nav pullRight key="right">
        <NavDropdown title={[<FontAwesome name="user" fixedWidth/>,user.email]} id="nav-dropdown">
          { /* FIXME: Disabled until we have UI <MenuItem>Profile</MenuItem> */ }
          <MenuItem onClick={logout}>Sign out</MenuItem>
        </NavDropdown>
      </Nav>
  );
};

let LoginMenu = ({user, login, logout}) => {
  if (!user) return <PublicLoginMenu login={login}/>;
  return <LoggedInMenu user={user} logout={logout}/>;
};

// Maps the global state into props send to the LoginMenu component
const mapStateToLoginMenuProps = (state) => {
  return {
    user: state.auth.user
  };
};

// Creates props on the LoginMenu which are functions that will dispatch actions
const mapDispatchToLoginMenuProps = (dispatch) => {
  return {
    login: () => dispatch(login()),
    logout: () => dispatch(logout())
  };
};
LoginMenu = connect(mapStateToLoginMenuProps, mapDispatchToLoginMenuProps)(LoginMenu);

let MainMenu = ({isLoggedIn}) => {
  if (isLoggedIn) {
    return (
      <Nav key="menu">
        <LinkContainer to="/large"><NavItem>Large</NavItem></LinkContainer>
        <LinkContainer to="/small"><NavItem>Small</NavItem></LinkContainer>
      </Nav>
    );
  }
  return <div/>;
};

// Maps the global state into props send to the LoginMenu component
const mapStateToMainMenuProps = (state) => {
  return {
    isLoggedIn: state.auth.user
  };
};
MainMenu = connect(mapStateToMainMenuProps)(MainMenu);

class Header extends React.Component {

  render() {
    return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="/"><span><img src={logo} alt="BoilerPlate" style={{height: "27px", padding: "0 15px 0 0"}} /></span>BoilerPlate</a>
        </Navbar.Brand>
      </Navbar.Header>
      <MainMenu/>
      <LoginMenu/>
    </Navbar>
    );
  }
}

/* FIXME For safety, specify propTypes
Header.propTypes = {
}
*/

export default connect()(Header);
