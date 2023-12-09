import { Schema } from 'express-validator';
import { VALIDATION_LOGIN, VALIDATION_STRING } from '../../constants/validation';

export const GET_SCHEMA: Schema = {};

export const GET_LOGIN_SCHEMA: Schema = {
  walletAddress: VALIDATION_STRING('body'),
};
