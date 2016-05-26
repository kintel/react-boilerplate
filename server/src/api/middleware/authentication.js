// Move this to a folder/module for middlewares


import jwt from 'express-jwt';
import config from '../../config/config';

// jwt() sets req.user to the decoded JSON Web Token
// from the "Authorization: Bearer <token>" header
export const optionalAuth = jwt({
  secret: config.AUTH0_CLIENT_SECRET,
  audience: config.AUTH0_CLIENT_ID,
  credentialsRequired: false
});

export const authenticate = jwt({
  secret: config.AUTH0_CLIENT_SECRET,
  audience: config.AUTH0_CLIENT_ID
});

