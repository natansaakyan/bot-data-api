import { Transform } from 'class-transformer';

export function TransformBoolean() {
  return Transform(({ value }) =>
    typeof value === 'string' ? value.toLowerCase() !== 'false' : Boolean(value),
  );
}
