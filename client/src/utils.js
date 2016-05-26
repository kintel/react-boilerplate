import {UserAuthWrapper} from 'redux-auth-wrapper';
import {login} from './modules/auth';

export const requireAuthentication = UserAuthWrapper({
  authSelector: state => state.auth,
  predicate: auth => auth.user,
  redirectAction: login,
  wrapperDisplayName: 'UserIsJWTAuthenticated'
});

