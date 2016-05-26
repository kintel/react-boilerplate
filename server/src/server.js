import express from 'express';
import status from 'http-status';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import cors from 'cors';
import morgan from 'morgan';
import * as mongodb from './mongodb';
import mongoose from 'mongoose';
import jwt from 'express-jwt';
import restify from './api/restify';
import api from './api';
import {JSONError} from './errors';

import config from './config/config';

function setupApp() {
  const app = express();

  app.set('port', config.PORT);
  app.use(helmet());            // Various security middlewares:
                                // dont-sniff-mimetype: X-Content-Type-Options: nosniff
                                // frameguard: X-Frame-Options: SAMEORIGIN
                                // hide-powered-by: Remove X-Powered-By (from Express)
                                // hsts: Strict-Transport-Security: <one day> (for https)
                                // ienoopen: X-Download-Options: NoOpen (IE only)
                                // x-xss-protection: X-XSS-Protection (mostly redundant)
  // We could do more hardening:
  // Content-Security-Policy - see csp package
  // HTTP Public Key Pinning - see hpkp package

  app.use(morgan('dev'));       // Log all requests
  app.use(bodyParser.json());   // We only support JSON bodies, no direct form submissions
  // The bodyParser fails in interesting ways, let's handle that
  app.use(function(err, req, res, next) {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      res.status(err.status).send('bad JSON');
    }
    else {
      res.status(err.status).send(err.message);
    }
  });

  app.use(methodOverride());    // Support X-HTTP-Method-Override. Firewalls/proxies may filter PUT/DELETE

  // FIXME: This is a private API, so we don't really need cors - we just allow it for now.
  app.use(cors()); // Will handle and short-circuit OPTIONS requests

  // We currentl don't use cookies
  // app.use(cookieParser());

  // We currently don't use server-side views
  // app.set('views', __dirname + '/views');
  // app.set('view engine', 'jsx');
  // app.engine('jsx', require('express-react-views').createEngine({transformViews: false}));

  // FIXME: Disable etag caching for now. Fix for production
  app.disable('etag');

  app.use('/api', api);
  app.use('/api', restify);

  app.use(function(req, res, next) {
    res.status(404).send('404');
  });

  app.use(function (err, req, res, next) {
//  console.log(`${req.url}: ${req.erm ? JSON.stringify(req.erm) : ""} ${err.toString()}`);
    // This is our custom error type
    if (err instanceof JSONError) {
      res.status(err.status).json(err.json());
    }
    // Error from express-restify-mongoose
    else if (req.erm) {
      res.status(req.erm.statusCode).json({success: false, message: err.toString()});
    }
    // MongoDB errors
    else if (err.name === 'MongoError') {
      res.status(status.UNPROCESSABLE_ENTITY).json({message: err.message});
    }
    // Thrown by express-jwt
    else if (err.name === 'UnauthorizedError') {
      res.status(status.UNAUTHORIZED).json({success: false, message: 'Invalid token'});
    }
    // Catch-all
    else {
      res.status(status.INTERNAL_SERVER_ERROR).json({success: false, message: err.toString()});
    }
  });

  app.get('*', function(req, res) {
    res.status(status.NOT_FOUND).json(new JSONError(status.NOT_FOUND, 'Not Found').json());
  });

  const server = app.listen(app.get('port'), () => console.log(`Launched at port ${app.get('port')}`));
  // To avoid leaving the server bound to the port on Ctrl-C
  process.on('SIGINT', () => server.close());
  return server;
}

function createServer() {
  process.on('unhandledRejection', function(reason, p) {
    console.log('Unhandled Rejection at: Promise ', p, ' reason: ', reason);
    // application specific logging, throwing an error, or other logic here
  });

  // Using preudo-thenable instead of the 'once' event
  return mongodb.connect().then(() => {
    return setupApp();
  },(err) => {
    console.log(`mongodb connection error: ${err}`);
  });
}

export default createServer;
