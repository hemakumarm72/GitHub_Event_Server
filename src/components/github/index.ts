import express from 'express';

import * as controller from './project.controller';

const router = express.Router();

router.post('/project', controller.addProjects);
router.get('/project/:walletAddress', controller.getProjectByAddress);
router.get('/project/:projectId', controller.projectListening);

export default router;
