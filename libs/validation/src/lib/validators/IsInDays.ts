import {
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import { DayNumber } from '../types';

export function __IsInDays(date: Date, hours: DayNumber[]) {
  return hours.includes(date.getDay() as DayNumber);
}

export function IsInDays(
  options: DayNumber[],
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return (object: any, propertyName: any) => {
    registerDecorator({
      name: 'isInDays',
      target: object.constructor,
      propertyName: propertyName,
      constraints: ['isInDays'],
      options: validationOptions,
      validator: {
        validate(value: Date, args: ValidationArguments) {
          return __IsInDays(value, options);
        },
      },
    });
  };
}
