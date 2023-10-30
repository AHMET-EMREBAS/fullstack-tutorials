import { IsNotEmpty, IsOptional, ValidationOptions } from 'class-validator';
import { CombinePropertyDecorators } from '@techbir/common';

export class CommonPropertyOptions {
  required?: boolean;
  isArray?: boolean;
}

/**
 * Valiatetion decorators that are common for all property types.
 * @param options
 * @returns
 */
export function CommonProperty(options: CommonPropertyOptions) {
  const decorators: PropertyDecorator[] = [];

  if (options) {
    const { isArray, required } = options;

    const validationOptionsValue: ValidationOptions = { each: isArray };

    if (required) {
      decorators.push(IsNotEmpty(validationOptionsValue));
    } else {
      decorators.push(IsOptional(validationOptionsValue));
    }
  }

  return CombinePropertyDecorators(...decorators);
}
