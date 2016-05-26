import API from '../api';

const SERVER_PING = 'SERVER_PING';
const SERVER_ERROR = 'SERVER_ERROR';

// Manages state.server
export default function reducer(state = {}, action) {
  switch (action.type) {
    case SERVER_PING:
    return {
      ...state,
      version: action.version
    };
    break;
    case SERVER_ERROR:
    // FIXME: Handle timeout and error. Also display error in footer
    const newstate = {
      ...state
    };
    delete newstate.version;
    return newstate;
    break;
    default:
    return state;
  }
}

export function ping() {
  return (dispatch) => {
    return API.ping()
      .then(pinginfo => dispatch({ type: SERVER_PING, version: pinginfo.version }))
      .catch(err => dispatch({ type: SERVER_ERROR, err: err.response ? err.response.data : err}));
  };
}
