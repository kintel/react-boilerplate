import { Router } from 'express';
import restify from 'express-restify-mongoose';
import SmallItems from '../models/SmallItems';
import LargeItems from '../models/LargeItems';
import { authenticate, optionalAuth } from './middleware/authentication';

const router = new Router();

restify.defaults({
  prefix: '',      // We map our own prefix (typically '/api') in server.js
  version: '/v1',
  onError: (err, req, res, next) => next(err)
});

router.use(authenticate);
restify.serve(router, SmallItems);
restify.serve(router, LargeItems);

export default router;
