import { ParamSchema, Location } from 'express-validator';
import { EMAIL_MAX_LENGTH, PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH, PR_MAX_LENGTH, PR_MIN_LENGTH } from './length';
import { REGEXP_PASSWORD } from './regexp';
import { comparePassword } from '../utils/bcrypt';
import { setAdmin, setInfluence } from '../utils/helper';
import { getTokenByID } from '../models/token';
import { isAfterCurrentJST } from '../utils/dayjs';
import { getAdminByID, getAdminByEmail } from '../models/Admin';
import { getInfluencebyObject, getInfluencerByEmail, getInfluencerByID } from '../models/Influencer';
import { dataNotExistException, unauthorizedException } from '../utils/apiErrorHandler';
import { decodeJwt } from '../utils/jwt';

export const VALIDATION_INFLUENCES_EMAIL_EXIST = (where: Location): ParamSchema => ({
  in: [where],
  isEmail: true,
  optional: {
    options: { nullable: true },
  },
  isLength: {
    options: { max: EMAIL_MAX_LENGTH },
  },
  custom: {
    options: async (value, { req, location, path }) => {
      const influencer = await getInfluencerByEmail(value);
      if (!influencer) throw new Error('1002');
      /// if (influencer.deletedAt !== null) throw unauthorizedException('This influencer is deleted');
      if (influencer.deletedAt !== null) throw new Error('1015');

      return true;
    },
  },
});

export const VALIDATION_INFLUENCES_EMAIL_NOT_EXIST = (where: Location): ParamSchema => ({
  in: [where],
  isEmail: true,
  optional: {
    options: { nullable: true },
  },
  isLength: {
    options: { max: EMAIL_MAX_LENGTH },
  },
  custom: {
    options: async (value, { req, location, path }) => {
      const influencer = await getInfluencerByEmail(value);
      if (influencer) throw new Error('2001'); //TODO: if user already used email throw error
      return true;
    },
  },
});

export const VALIDATION_INFLUENCES_PASSWORD_CHECK = (where: Location, checkBy: 'email' | 'id'): ParamSchema => ({
  in: [where],
  isString: true,
  matches: {
    options: REGEXP_PASSWORD,
  },
  isLength: {
    options: { min: PASSWORD_MIN_LENGTH, max: PASSWORD_MAX_LENGTH },
  },
  custom: {
    options: async (value, { req, location, path }) => {
      const influencer =
        checkBy === 'email' ? await getInfluencerByEmail(req.body.email) : await getInfluencerByID(req.influences._id);
      if (!influencer) throw new Error('1002');

      const isMatch = await comparePassword(value, influencer.password);
      if (!isMatch) throw new Error('1004');
      if (influencer.status !== 'Contracted') throw unauthorizedException('This influencer is not contracted');

      req.influences = setInfluence(influencer);

      return true;
    },
  },
});

export const VALIDATION_INFLUENCESBY_ID = (where: Location): ParamSchema => ({
  in: [where],
  isString: true,
  custom: {
    options: async (value, { req, location, path }) => {
      const influencer = await getInfluencerByID(value);
      if (!influencer) throw new Error('1002');
      req.influences = setInfluence(influencer);

      return true;
    },
  },
});

export const VALIDATION_INFLUENCES_STATUS = (where: Location, checkBy: 'Applying' | 'Approval'): ParamSchema => ({
  in: [where],
  isString: true,
  custom: {
    options: async (value, { req, location, path }) => {
      const influencer = await getInfluencerByID(value);
      if (!influencer) throw new Error('1002');
      if (influencer.status !== checkBy) throw new Error('1016');
      req.influences = setInfluence(influencer);

      return true;
    },
  },
});

export const VALIDATION_DOCUMENT_ID = (where: Location): ParamSchema => ({
  in: [where],
  isString: true,
  custom: {
    options: async (value, { req, location, path }) => {
      const data = {
        documentId: Number(value),
      };
      const influencer = await getInfluencebyObject(data);
      if (!influencer) throw new Error('1002');
      req.influences = setInfluence(influencer);

      return true;
    },
  },
});

export const VALIDATION_EMAIL_EXIST = (where: Location): ParamSchema => ({
  in: [where],
  isEmail: true,
  optional: {
    options: { nullable: true },
  },
  isLength: {
    options: { max: EMAIL_MAX_LENGTH },
  },
  custom: {
    options: async (value, { req, location, path }) => {
      const admin = await getAdminByEmail(value);
      if (!admin) throw dataNotExistException('Email does not register');
      if (admin.deletedAt !== null) throw unauthorizedException('This admin is deleted.');

      if (admin.role !== 'SuperAdmin' && admin.role !== 'General') throw new Error('1002');
      return true;
    },
  },
});
export const VALIDATION_PASSWORD_CHECK = (where: Location, checkBy: 'email' | 'id'): ParamSchema => ({
  in: [where],
  isString: true,
  matches: {
    options: REGEXP_PASSWORD,
  },
  isLength: {
    options: { min: PASSWORD_MIN_LENGTH, max: PASSWORD_MAX_LENGTH },
  },
  custom: {
    options: async (value, { req, location, path }) => {
      const admin = checkBy === 'email' ? await getAdminByEmail(req.body.email) : await getAdminByID(req.admin._id);
      if (!admin) throw new Error('1002');

      const isMatch = await comparePassword(value, admin.password);
      if (!isMatch) throw new Error('1004');
      req.admin = setAdmin(admin);

      return true;
    },
  },
});
export const VALIDATION_PASSWORD = (where: Location): ParamSchema => ({
  in: [where],
  isString: true,
  matches: {
    options: REGEXP_PASSWORD,
  },
  isLength: {
    options: { min: PASSWORD_MIN_LENGTH, max: PASSWORD_MAX_LENGTH },
  },
});

export const VALIDATION_STRING = (where: Location): ParamSchema => ({
  in: [where],
  isString: true,
  notEmpty: true,
});

export const VALIDATION_STRING_OPTIONAL = (where: Location): ParamSchema => ({
  in: [where],
  isString: true,
  notEmpty: false,
});

export const VALIDATION_INFLUENCER_REFRESH_TOKEN = (where: Location): ParamSchema => ({
  in: [where],
  isString: true,
  notEmpty: true,
  custom: {
    options: async (value, { req, location, path }) => {
      const decoded = decodeJwt(value, 'refresh');
      const influences = await getInfluencerByID(decoded.payload.id);
      if (!influences) throw dataNotExistException('influences is not exist');
      if (influences.deletedAt !== null) throw unauthorizedException('This influences is deleted');
      if (influences.refreshToken !== value) throw unauthorizedException('Refresh token is not valid');

      req.influences = setInfluence(influences);

      return true;
    },
  },
});

export const VALIDATION_ADMIN_REFRESH_TOKEN = (where: Location): ParamSchema => ({
  in: [where],
  isString: true,
  notEmpty: true,
  custom: {
    options: async (value, { req, location, path }) => {
      const decoded = decodeJwt(value, 'refresh');
      const admin = await getAdminByID(decoded.payload.id);
      if (!admin) throw dataNotExistException('Admin is not exist');
      if (admin.deletedAt !== null) throw unauthorizedException('This admin is deleted');
      if (admin.refreshToken !== value) throw unauthorizedException('Refresh token is not valid');
      req.admin = setAdmin(admin);

      return true;
    },
  },
});

export const VALIDATION_NUMBER = (where: Location): ParamSchema => ({
  in: [where],
  isNumeric: true,
  notEmpty: true,
});

export const VALIDATION_TOKEN = (where: Location): ParamSchema => ({
  in: [where],
  isString: true,
  notEmpty: true,
  custom: {
    options: async (value, { req, location, path }) => {
      const token = await getTokenByID(value);
      if (!token) throw new Error('Token does not exist');
      if (isAfterCurrentJST(token.expiredAt.toISOString())) return true;
      throw new Error('Token is already expired');
    },
  },
});

export const VALIDATION_BOOLEAN = (where: Location): ParamSchema => ({
  in: [where],
  isBoolean: true,
  notEmpty: true,
});

export const VALIDATION_NON_EMPTY_ARRAY = (where: Location): ParamSchema => ({
  in: [where],
  isArray: true,
  notEmpty: true,
});
