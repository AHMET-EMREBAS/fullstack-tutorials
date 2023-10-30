import { Hour } from '@techbir/common';
import {
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';


export function __IsBetweenHours(date: Date, start: Hour, end: Hour) {
  const hour = date.getHours();

  if (hour >= start && hour <= end) {
    return true;
  }
  return false;
}

export function IsBetweenHours(
  options: {
    start: Hour;
    end: Hour;
  },
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return function (object: any, propertyName: any) {
    registerDecorator({
      name: 'isBetweenHours',
      target: object.constructor,
      propertyName: propertyName,
      constraints: ['isBetweenHours'],
      options: validationOptions,
      validator: {
        validate(value: Date, args: ValidationArguments) {
          return __IsBetweenHours(value, options.start, options.end);
        },
      },
    });
  };
}
