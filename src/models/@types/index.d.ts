import mongoose from 'mongoose';

export type NewUserDocument = {
  userId: string;
  username: string;
  profileImg: string;
  walletAddress: string;
};

export type UpdateUserDocument = {
  username: string;
  walletAddress: string;
};

export type UserDocument = mongoose.Document & NewUserDocument;

export type NewProjectDocument = {
  projectId: string;
  contractEmail: string;
  contractAddress: string;
  perSharePrice: number;
  walletAddress: string;
  gitHubLink: string;
  projectName: string;
  mileStoneNo: number;
  dueDate: Date;
  stackingAmount: number;
};

export type UpdateProjectDocument = {
  gitHubLink?: string;
  projectName?: string;
  perSharePrice?: number;
  dueDate?: Date;
  mileStoneNo?: number;
  stackingAmount?: number;
};

export type ProjectDocument = mongoose.Document & NewProjectDocument;
