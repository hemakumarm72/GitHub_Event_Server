import express from 'express';
const router = express.Router();

// import authComponent from "./auth";
import userComponent from './user';
import gitComponent from './github';

router.use('/user', userComponent);
router.use('/github', gitComponent);
export default router;
