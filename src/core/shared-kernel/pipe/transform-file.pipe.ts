import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';
import { ValidatorOptions } from '@nestjs/common/interfaces/external/validator-options.interface';
import InternalFile from '../data/internal-file';

interface TransformMultipleFilesPipeOptions extends ValidatorOptions {
  isRequired?: boolean;
}

export class TransformFilePipe implements PipeTransform {
  protected isRequired: boolean;

  constructor(options?: TransformMultipleFilesPipeOptions) {
    this.isRequired = options?.isRequired || false;
  }

  transform(value: Express.Multer.File, _metadata: ArgumentMetadata) {
    if (this.isRequired && !value) {
      throw new BadRequestException('Image is required');
    }
    return value ? InternalFile.fromMulter(value) : value;
  }
}

export class TransformMultipleFilesPipe implements PipeTransform {
  protected isRequired: boolean;

  constructor(options?: TransformMultipleFilesPipeOptions) {
    this.isRequired = options?.isRequired || false;
  }

  transform(value: Express.Multer.File[], _metadata: ArgumentMetadata) {
    if (this.isRequired && !value) {
      throw new BadRequestException('Images is required');
    }
    return value ? value.map(InternalFile.fromMulter) : value;
  }
}
