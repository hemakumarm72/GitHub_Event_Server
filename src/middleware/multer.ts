import multer, { MulterError } from 'multer';
import { Request } from 'express';

const imagefileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype.split('/')[0] === 'image') {
    cb(null, true);
  } else {
    cb(new Error('LIMIT_UNEXPECTED_FILE'));
  }
};

const pdffileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype.split('/')[0] === 'pdf') {
    cb(null, true);
  } else {
    cb(new Error('LIMIT_UNEXPECTED_FILE'));
  }
};

const storage = multer.memoryStorage();
//TODO: Multer setup size
const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 2, // 2 MB limit
  },
  fileFilter: imagefileFilter, // Use fileFilter instead of imagefileFilter
});

const uploadpdf = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 10, // 10 MB limit
  },
  fileFilter: pdffileFilter, // Use fileFilter instead of pdffileFilter
});

export { upload, uploadpdf };
