import mongoose from 'mongoose';

export type NewUserDocument = {
  userId: string;
  walletAddress: string;
};

export type UpdateUserDocument = {
  walletAddress: string;
};

export type UserDocument = mongoose.Document & NewUserDocument;
