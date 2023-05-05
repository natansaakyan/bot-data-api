import InternalFile from '../data/internal-file';

export interface MediaStorageInterface {
  uploadFile(file: InternalFile, destPath: string): Promise<string | null>;

  uploadFileFromUrl(url: string, destPath: string): Promise<string | null>;
}

export const MediaStorageInterfaceType = Symbol.for('MediaStorageInterfaceType');
