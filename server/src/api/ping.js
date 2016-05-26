import { Router } from 'express';
import { authenticate, optionalAuth } from './middleware/authentication';
const pkg = require('../../package.json');

const router = new Router();

router.get('/', optionalAuth, function(req, res) {

  const auth = req.user ? {user: req.user.sub} : {};
  res.json(Object.assign({success: true,
                          message: "Public ping",
                          version: pkg.version
                         },
                         auth));
});

router.get('/secure', authenticate, function(req, res) {
  res.json({success: true,
            message: "Authenticated ping",
            version: pkg.version,
            user: req.user.sub
           });
});

export default router;
