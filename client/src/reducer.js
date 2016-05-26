import { combineReducers } from 'redux';
import auth from './modules/auth';
import small from './modules/small';
import large from './modules/large';
import server from './modules/server';
import { routerReducer } from 'react-router-redux';

export default (state = {}, action) => {
  const newstate = combineReducers({
    auth,
    small,
    large,
    server,
    routing: routerReducer
  })(state, action);

  return newstate;
};
