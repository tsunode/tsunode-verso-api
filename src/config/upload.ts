import path from 'path';
import multer, { StorageEngine } from 'multer';
import { v4 as uuidV4 } from 'uuid';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

interface IUploadConfig {
  driver: 's3' | 'disk';

  tmpFolder: string;
  uploadsFolder: string;

  multer: {
    storage: StorageEngine;
  };

  config: {
    aws: {
      bucket: string;
    };
  };
}

const uploadConfig = {
  driver: process.env.STORAGE_DRIVER,

  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, ''),

  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(request, file, callback) {
        const filenameFormated = file.originalname.replace(/[\s]/g, '_');
        const filename = `${uuidV4()}-${filenameFormated}`;

        return callback(null, filename);
      },
    }),
    limits: {
      fileSize: '25mb',
    },
  },

  config: {
    disk: {},
    aws: {
      bucket: 'tsunodeverso',
    },
  },
} as IUploadConfig;

export { uploadConfig };
