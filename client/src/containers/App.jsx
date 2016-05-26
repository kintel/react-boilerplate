import React from 'react';
import {connect} from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {ping} from '../modules/server';
import pkg from '../../package.json';

class App extends React.Component {

  constructor(props) {
    super();
    this.props = props;
  }

  componentDidMount() {
    this.props.ping();
  }

  render() {
    return <div style={{height: "100%", paddingBottom: "100px"}}>
        <Header />
        {this.props.children}
        <Footer clientVersion={pkg.version} serverVersion={this.props.serverVersion}/>
      </div>;
  }
}

const mapStateToProps = (state) => {
  return {
    serverVersion: state.server.version
  };
};

const mapDispatchToProps = {
  ping
};

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

module.exports = AppContainer;
