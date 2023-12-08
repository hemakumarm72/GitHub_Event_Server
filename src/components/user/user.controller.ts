import { Request, Response, NextFunction } from 'express';
import { handleResponse } from '../../middleware/requestHandle';
import { AddWallet, getWallet } from '../../models/user';
import { NewUserDocument } from '../../models/@types';
import { generatedId } from '../../utils/randomId';

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
    if (!getCheck) throw new Error('1001'); //TODO: wallet address not found
    return handleResponse(res, 200, {});
  } catch (err: any) {
    console.log(err);
    next(err);
  }
};

export const registerWallet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { walletAddress } = req.body;

    const getCheck = await getWallet(walletAddress);
    if (getCheck) throw new Error('1002'); //TODO: wallet address exits
    const user: NewUserDocument = {
      userId: generatedId(),
      walletAddress,
    };
    await AddWallet(walletAddress);

    return handleResponse(res, 200, {});
  } catch (err: any) {
    console.log(err);
    next(err);
  }
};
