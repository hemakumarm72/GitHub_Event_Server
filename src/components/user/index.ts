import express from 'express';

import * as controller from './user.controller';

const router = express.Router();

router.get('/health', controller.getHealth);
router.put('/wallet', controller.login);
router.post('/register', controller.registerWallet);

export default router;
