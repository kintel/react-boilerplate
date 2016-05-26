require('bootstrap/less/bootstrap.less');
require('font-awesome/less/font-awesome.less');
require('./index.less');

import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
import {syncHistoryWithStore, routerMiddleware} from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducer';
import RouterContainer from './RouterContainer';

const finalCreateStore = compose(
  applyMiddleware(
    thunkMiddleware, // Let's us dispatch() functions, not just actions
    routerMiddleware(browserHistory) // Make react-router-redux.push() work
  ),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);
const store = finalCreateStore(reducer);

const history = syncHistoryWithStore(browserHistory, store);

// We're dynamically creating the route hierarchy instead of using JSX syntax,
// to better modularize our code
const rootRoute = {
  childRoutes: [ {
    path: '/',
    component: require('./containers/App'),
    indexRoute: { component: require('./components/Home') },
    childRoutes: [
      require('./routes/large'),
      require('./routes/small'),
    ]
  } ]
};

const router = <Provider store={store}>
  <Router history={history} routes={rootRoute}/>
</Provider>;
RouterContainer.set(router);

ReactDOM.render(router, document.getElementById('content'));
