import mongoose from 'mongoose';

export type NewUserDocument = {
  userId: string;
  walletAddress: string;
};

export type UpdateUserDocument = {
  walletAddress: string;
};

export type UserDocument = mongoose.Document & NewUserDocument;

export type NewProjectDocument = {
  userId: string;
  perSharePrice: number;
  walletAddress: string;
  gitRepoId: string;
  gitHubLink: string;
  projectName: string;
  dueDate: Date;
  stackingAmount: number;
  limitParticipant: number;
};

export type UpdateProjectDocument = {
  gitHubLink?: string;
  projectName?: string;
  perSharePrice?: number;
  dueDate?: Date;
  stackingAmount?: number;
  limitParticipant?: number;
};


export type ProjectDocument = mongoose.Document & NewProjectDocument;
