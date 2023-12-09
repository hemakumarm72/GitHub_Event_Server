import express from 'express';
const router = express.Router();

// import authComponent from "./auth";
import userComponent from './user';
import projectComponent from './project';

router.use('/user', userComponent);
router.use('/project', projectComponent);
export default router;
