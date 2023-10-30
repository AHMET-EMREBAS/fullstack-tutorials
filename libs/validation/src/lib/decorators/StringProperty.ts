import { CombinePropertyDecorators } from './CombinePropertyDecorators';
import {
  MinLength,
  MaxLength,
  IsIn,
  ValidationOptions,
  IsString,
  IsEmail,
  IsStrongPassword,
  IsUUID,
} from 'class-validator';
import { CommonProperty, CommonPropertyOptions } from './CommonProperty';

export class StringPropertyOptions extends CommonPropertyOptions {
  minLength?: number;
  maxLength?: number;
  enums?: string[];
  format?: 'email' | 'password' | 'uuid';
}

/**
 * String property validation decorators
 * @param options
 * @returns
 */
export function StringProperty(
  options: StringPropertyOptions
): PropertyDecorator {
  const { minLength, maxLength, enums, isArray, format } = options;

  const validationOptionsValue: ValidationOptions = { each: isArray };

  const decorators: PropertyDecorator[] = [IsString(), CommonProperty(options)];

  if (minLength != undefined) {
    decorators.push(MinLength(minLength, validationOptionsValue));
  }

  if (maxLength != undefined) {
    decorators.push(MaxLength(maxLength, validationOptionsValue));
  }

  if (enums != undefined) {
    decorators.push(IsIn(enums, validationOptionsValue));
  }

  if (format === 'email') {
    decorators.push(IsEmail({}, validationOptionsValue));
  } else if (format === 'password') {
    decorators.push(IsStrongPassword({}, validationOptionsValue));
  } else if (format === 'uuid') {
    decorators.push(IsUUID('4', validationOptionsValue));
  }

  return CombinePropertyDecorators(...decorators);
}
