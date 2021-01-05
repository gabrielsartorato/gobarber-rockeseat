import fs from 'fs';
import path from 'path';

import uploadConfig from '@config/upload';
import IStoragedProvider from '../models/IStoragedProvider';

interface IStoragedFile {
  file: string;
}

class FakeStoragedProvider implements IStoragedProvider {
  public storage: string[] = [];

  public async saveFile(file: string): Promise<string> {
    this.storage.push(file);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const findIndex = this.storage.findIndex(
      storageFile => storageFile === file,
    );

    this.storage.splice(findIndex, 1);
  }
}

export default FakeStoragedProvider;
