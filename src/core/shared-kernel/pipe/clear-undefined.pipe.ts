import { ArgumentMetadata, PipeTransform } from '@nestjs/common';

export const cleanFromUndefined = (obj: object) => {
  for (const property of Object.getOwnPropertyNames(obj)) {
    if (obj[property] === undefined) {
      delete obj[property];
    }
  }
  return obj;
};

export class ClearUndefinedPipe implements PipeTransform {
  transform(value: object, _metadata: ArgumentMetadata) {
    return cleanFromUndefined(value);
  }
}
