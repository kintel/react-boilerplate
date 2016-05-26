import Auth0Lock from 'auth0-lock';
import jwt from 'jsonwebtoken';
import {push} from 'react-router-redux';
const logo = require('../../images/logo.svg');

const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';
const LOGOUT = 'LOGOUT';
const LOCK_SUCCESS = 'LOCK_SUCCESS';
const LOCK_ERROR = 'LOCK_ERROR';

const token = localStorage.getItem('jwt');
if (token) {
  const payload = jwt.decode(token);
  if (Math.floor(Date.now() / 1000) >= payload.exp) { // Check if token has expired
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
  }
}

const initialState = {
  jwt: localStorage.getItem('jwt'),
  // Auth0 normalized user profile
  user: JSON.parse(localStorage.getItem('user'))
};

// Manages state.auth
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOCK_SUCCESS:
    return {
      ...state,
      user: action.user,
      jwt: action.jwt
    };
    break;
    case LOCK_ERROR:
    return {
      ...state,
      error: action.err
    };
    break;
    case LOGOUT:
    return {};
    break;
    default:
    return state;
  }
}

function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  };
}

function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: user.id_token
  };
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  };
}

function lockSuccess(user, jwt) {
  return {
    type: LOCK_SUCCESS,
    user,
    jwt
  };
}

function lockError(err) {
  return {
    type: LOCK_ERROR,
    err
  };
}

// Opens the Lock widget and
// dispatches actions along the way
export function login() {
  const lock = new Auth0Lock('qJ8mCLuh8JQONoAGdYKN4YDWQZuTbep7', 'mkplayground.auth0.com');
  return (dispatch) => {
    lock.show({
      icon: logo,
      socialBigButtons: true
    }, (err, user, jwt) => {
      if(err) {
        dispatch(lockError(err));
        return;
      }
      localStorage.setItem('jwt', jwt);
      // This is the normalized user profile from Auth0: https://auth0.com/docs/user-profile/normalized
      localStorage.setItem('user', JSON.stringify(user));
      dispatch(lockSuccess(user, jwt));
    });
  };
}

export function logout() {
  return (dispatch) => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    dispatch(push('/'));
    dispatch({ type: LOGOUT });
  };
}
