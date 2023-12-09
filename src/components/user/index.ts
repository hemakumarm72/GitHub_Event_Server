import express from 'express';
import { checkSchema } from 'express-validator';

import * as controller from './user.controller';

const router = express.Router();

import { checkValidation } from '../../utils/validation';
import { GET_LOGIN_SCHEMA, GET_SCHEMA } from './user.validation';

router.get('/health', controller.getHealth);
router.put('/wallet', checkSchema(GET_LOGIN_SCHEMA), checkValidation, controller.login);
router.post('/register', checkSchema(GET_SCHEMA), checkValidation, controller.registerWallet);

export default router;
