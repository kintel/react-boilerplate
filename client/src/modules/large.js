import { push } from 'react-router-redux';
var HTTPStatus = require('http-status');
import API from '../api';

const FIND_LARGE = 'FIND_LARGE';
const FIND_LARGEITEMS = 'FIND_LARGEITEMS';
const FOUND_LARGE = 'FOUND_LARGE';
const FOUND_LARGEITEMS = 'FOUND_LARGEITEMS';
const SAVE_LARGE = 'SAVE_LARGE';
const CANCEL_LARGE = 'CANCEL_LARGE';
const LARGE_SUCCESS = 'LARGE_SUCCESS'
const LARGE_FAILURE = 'LARGE_FAILURE'

const initialState = {};

// Manages state.small
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LARGE_SUCCESS: {
      const newstate = {
        ...state,
        large: action.large
      };
      delete newstate.error;
      return newstate;
    }
    break;
    case LARGE_FAILURE: {
      const newstate = {
        ...state,
        error: action.message
      };
      delete newstate.large;
      return newstate;
    }
    break;
    case FOUND_LARGEITEMS:
    return {
      ...state,
      largeItems: action.largeItems
    };
    break;
    default:
    return state;
  }
}

export function largeFailure(message) {
  return { type: LARGE_FAILURE, message };
}

export function largeSuccess(large) {
  return { type: LARGE_SUCCESS, large };
}

export function searchLarge() {
  return (dispatch) => {
    dispatch({ type: FIND_LARGEITEMS });
    setTimeout(() => {
      const largeItems = [
// FIXME: Results
      ];
      dispatch({ type: FOUND_LARGEITEMS, largeItems });
    }, 1000);
  };
}

// Location (if specified) will be pushed after Large is found
export function findLarge(key, location) {
  return async (dispatch) => {
    return API.largeitems.find(key)
           .then(large => dispatch(largeSuccess(large)))
           .catch(err => dispatch(largeFailure(err.message)));
  };
}

/*
 * General editing of Large resources
 * If the Large was change, this will update the Large in the DB and
 * create a transaction record containing the changes (that is all done
 * server side, hence the use of a POST request).
 * FIXME: If we can prove that this operation is idempotent, we could use a PUT.
 */
export function saveLarge(large) {
  return async (dispatch) => {
    try {
      const newlarge = await API.largeitems.edit(large._id, large);
      dispatch(largeSuccess(newlarge));
    }
    catch (err) {
      dispatch(largeFailure(err.message));
    }
  };
}

export function cancelLarge() {
  return {
    type: CANCEL_LARGE
  }
}
