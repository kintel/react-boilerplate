import React from 'react';
import LoginStore from '../stores/LoginStore';
import Header from './Header';

export default class AuthenticatedApp extends React.Component {
  constructor() {
    super();
    this.state = this._getLoginState();
  }

  _getLoginState() {
    return {
      userLoggedIn: LoginStore.isLoggedIn()
    };
  }

  componentDidMount() {
    this.changeListener = this._onChange.bind(this);
    LoginStore.addChangeListener(this.changeListener);
  }

  _onChange() {
    this.setState(this._getLoginState());
  }

  componentWillUnmount() {
    LoginStore.removeChangeListener(this.changeListener);
 }

  componentWillMount() {
    this.createLock();
  }

  createLock() {
    this.lock = new Auth0Lock("A6CM5uo8xzV69iLR69kFyFEkZ52SmAXY", "mkplayground.auth0.com");
  }

  render() {
    return <div>
      <Header lock={this.lock} />
      {this.props.children}
    </div>;
  }
}
