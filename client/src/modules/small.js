import {push} from 'react-router-redux';
import API from '../api';
var HTTPStatus = require('http-status');

const FIND_SMALL = 'FIND_SMALL';
const FIND_SMALLITEMS = 'FIND_SMALLITEMS';
const FOUND_SMALL = 'FOUND_SMALL';
const FOUND_SMALLITEMS = 'FOUND_SMALLITEMS';
const SAVE_SMALL = 'SAVE_SMALL';
const CANCEL_SMALL = 'CANCEL_SMALL';
const SMALL_REQUEST = 'SMALL_REQUEST'
const SMALL_SUCCESS = 'SMALL_SUCCESS'
const SMALL_FAILURE = 'SMALL_FAILURE'

const initialState = {};

// Manages state.small
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FOUND_SMALLITEMS:
    return {
      ...state,
      smallItems: action.smallItems
    };
    case SMALL_SUCCESS: {
      const newstate = {
        state,
        small: action.small
      };
      delete newstate.error;
      return newstate;
    }
    break;
    case SMALL_FAILURE: {
      const newstate = {
        state,
        error: action.message
      };
      delete newstate.small;
      return newstate;
    }
    break;
    default:
    return state;
  }
}

export function smallFailure(message) {
  return { type: SMALL_FAILURE, message };
}

export function smallSuccess(small) {
  return { type: SMALL_SUCCESS, small };
}

export function searchSmall() {
  return (dispatch) => {
    dispatch({ type: FIND_SMALLITEMS });
    setTimeout(() => {
      const smallItems = [
        // FIXME: Results
      ];
      dispatch({ type: FOUND_SMALLITEMS, smallItems });
    }, 1000);
  };
}

// Location (if specified) will be pushed after Small is found
export function findSmall(key, location) {
  return async (dispatch) => {
    return API.smallitems.find(key)
      .then(small => dispatch(smallSuccess(small)))
      .catch(err => dispatch(smallFailure(err.message)));
  };
}

export function saveSmall(small) {
  return {
    type: SAVE_SMALL,
    small
  }
}

export function cancelSmall() {
  return {
    type: CANCEL_SMALL,
  }
}
