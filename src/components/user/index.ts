import express from 'express';

import * as controller from './user.controller';

const router = express.Router();

router.get('/health', controller.getHealth);

export default router;
