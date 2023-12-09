import express from 'express';

import * as controller from './project.controller';
import { checkSchema } from 'express-validator';
import { checkValidation } from '../../utils/validation';
import { GET_SCHEMA } from './project.validation';

const router = express.Router();

router.post('/', checkSchema(GET_SCHEMA), checkValidation, controller.addProjects);
router.get('/:walletAddress', checkSchema(GET_SCHEMA), checkValidation, controller.getProjectByAddress);
router.get('/project/:projectId', checkSchema(GET_SCHEMA), checkValidation, controller.projectListening);

export default router;
