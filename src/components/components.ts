import express from 'express';
const router = express.Router();

// import authComponent from "./auth";
import userComponent from './user';

router.use('/user', userComponent);

export default router;
