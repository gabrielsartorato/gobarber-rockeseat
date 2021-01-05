import { container } from 'tsyringe';
import uploadConfig from '@config/upload';

import IStoragedProvider from './models/IStoragedProvider';

import DiskStorageProvider from './implementations/DiskStorageProvider';
import S3StoragedProvider from './implementations/S3StoragedProvider';

const providers = {
  disk: DiskStorageProvider,
  s3: S3StoragedProvider,
};

container.registerSingleton<IStoragedProvider>(
  'StoragedProvider',
  providers[uploadConfig.driver],
);
