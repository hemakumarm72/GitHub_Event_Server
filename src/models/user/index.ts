import { NewUserDocument } from '../@types';
import { Users } from './user.entity';
import { ClientSession } from 'mongoose';

export const AddWallet = async (user: NewUserDocument, session?: ClientSession | null | undefined) => {
  try {
    const newUser = new Users(user);
    await newUser.save({ session });
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getWallet = async (walletAddress: string) => {
  try {
    const user = await Users.findOne({ walletAddress });
    return Promise.resolve(user);
  } catch (error) {
    return Promise.reject(error);
  }
};
