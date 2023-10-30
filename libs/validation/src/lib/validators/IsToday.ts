import {
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';

export function __IsToday(date: Date): boolean {
  const today = new Date();

  if (
    today.getDate() === date.getDate() &&
    today.getFullYear() === date.getFullYear() &&
    today.getMonth() === date.getMonth()
  ) {
    return true;
  }
  return false;
}

export function IsToday(
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return function (object: any, propertyName: any) {
    registerDecorator({
      name: 'isToday',
      target: object.constructor,
      propertyName: propertyName,
      constraints: ['isToday'],
      options: validationOptions,
      validator: {
        validate(value: Date, args: ValidationArguments) {
          return __IsToday(value);
        },
      },
    });
  };
}
