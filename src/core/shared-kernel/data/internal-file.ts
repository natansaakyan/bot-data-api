export default class InternalFile {
  fileName: string;

  path: string;

  size: number;

  mimeType: string;

  buffer: Buffer;

  originalName: string;

  public static fromMulter(file: Express.Multer.File): InternalFile {
    if (file === undefined) return undefined;
    const model = new InternalFile();

    model.fileName = file.filename;
    model.size = file.size;
    model.path = file.path;
    model.mimeType = file.mimetype;
    model.buffer = file.buffer;
    model.originalName = file.originalname;

    return model;
  }
}
