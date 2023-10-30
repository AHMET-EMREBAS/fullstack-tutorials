import {
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import { Hour } from '../types';

export function __IsInHours(date: Date, hours: Hour[]) {
  return hours.includes(date.getHours() as Hour);
}

export function IsInHours(
  options: Hour[],
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return (object: any, propertyName: any) => {
    registerDecorator({
      name: 'isInHours',
      target: object.constructor,
      propertyName: propertyName,
      constraints: ['isInHours'],
      options: validationOptions,
      validator: {
        validate(value: Date, args: ValidationArguments) {
          return __IsInHours(value, options);
        },
      },
    });
  };
}
