import { Request, Response, NextFunction } from 'express';
import { handleResponse } from '../../middleware/requestHandle';
import { AddWallet, getWallet } from '../../models/user';
import { NewUserDocument } from '../../models/@types';
import { generatedId } from '../../utils/randomId';
import { HttpException, badImplementationException } from '../../utils/apiErrorHandler';

export const getHealth = (req: Request, res: Response, next: NextFunction) => {
  try {
    return handleResponse(res, 200, {});
  } catch (err: any) {
    console.log(err);
    next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { walletAddress } = req.body;
    const getCheck = await getWallet(walletAddress);
    if (!getCheck) throw badImplementationException('1002');
    return handleResponse(res, 200, {});
  } catch (err: any) {
    console.error(err);
    next(err);
  }
};

export const registerWallet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, walletAddress } = req.body;

    const getCheck = await getWallet(walletAddress);
    if (getCheck) throw badImplementationException('1002'); //TODO: wallet address exits
    const user: NewUserDocument = {
      userId: generatedId(),
      username,
      walletAddress,
    };
    await AddWallet(user);

    return handleResponse(res, 200, { user });
  } catch (err: any) {
    console.log(err);
    next(err);
  }
};
