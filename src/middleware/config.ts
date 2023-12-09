import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import { connectMongo } from './mongo';
import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { badImplementationException } from '../utils/apiErrorHandler';

export const config = async (app: express.Application) => {
  app.use(cors());
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    // multerfunction
    if (error instanceof multer.MulterError) {
      if (error.message === 'LIMIT_FILE_SIZE') {
        return badImplementationException('File is large, upload 2MB below');
      }
      if (error.message === 'LIMIT_UNEXPECTED_FILE') {
        return badImplementationException('File must be an image JPEG and PNG');
      }
    } else if (error instanceof Error) {
      // An unknown error occurred when uploading.
      if (error.message === 'LIMIT_FILE_SIZE') {
        return badImplementationException('File is large, upload 2MB below');
      }
      if (error.message === 'LIMIT_UNEXPECTED_FILE') {
        return badImplementationException('File must be an image JPEG and PNG');
      }
    }
  });
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
  });

  await connectMongo();
};
