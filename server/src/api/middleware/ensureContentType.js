// Based on https://github.com/florianholzapfel/express-restify-mongoose/blob/master/src/middleware/ensureContentType.js

import http from 'http';
import onError from './onError';

export default function ensureContentType (req, res, next) {
  const ct = req.headers['content-type'];
  
  if (!ct) {
    const err = new Error(http.STATUS_CODES[400]);
    err.description = 'missing_content_type';
    err.statusCode = 400;
    return onError(err, req, res, next);
  }
  
  if (ct.indexOf('application/json') === -1) {
    const err = new Error(http.STATUS_CODES[400]);
    err.description = 'invalid_content_type';
    err.statusCode = 400;
    return onError(err, req, res, next);
  }
  
  next();
}
