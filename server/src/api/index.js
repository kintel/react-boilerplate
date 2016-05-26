import { Router } from 'express';
import { authenticate } from './middleware/authentication';
import ensureContentType from './middleware/ensureContentType';
import ping from './ping';
import login from './login';

const router = new Router();

router.use('/v1/ping', ping);
router.post('/v1/login', login);

export default router;
