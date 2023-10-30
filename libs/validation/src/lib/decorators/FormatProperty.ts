import {
  IsEmail,
  IsString,
  IsStrongPassword,
  IsUUID,
  ValidationOptions,
} from 'class-validator';
import { CommonProperty, CommonPropertyOptions } from './CommonProperty';
import { CombinePropertyDecorators } from '@techbir/common';

export class FormatPropertyOptions extends CommonPropertyOptions {
  format?: 'email' | 'password' | 'uuid';
}

export function FormatProperty(options: FormatPropertyOptions) {
  const { format, isArray } = options;
  const validationOptionsValue: ValidationOptions = { each: isArray };

  const decorators: PropertyDecorator[] = [
    IsString(validationOptionsValue),
    CommonProperty(options),
  ];

  if (format === 'email') {
    decorators.push(IsEmail({}, validationOptionsValue));
  } else if (format === 'password') {
    decorators.push(IsStrongPassword({}, validationOptionsValue));
  } else if (format === 'uuid') {
    decorators.push(IsUUID('4', validationOptionsValue));
  }

  return CombinePropertyDecorators(...decorators);
}
