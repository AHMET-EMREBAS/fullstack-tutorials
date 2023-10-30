import { CombinePropertyDecorators } from './CombinePropertyDecorators';
import { Min, Max, IsNumber, ValidationOptions, IsInt } from 'class-validator';
import { CommonProperty, CommonPropertyOptions } from './CommonProperty';

export class NumberPropertyOptions extends CommonPropertyOptions {
  min?: number;
  max?: number;
  int?: boolean;
}

export function NumberProperty(
  options: NumberPropertyOptions
): PropertyDecorator {
  const { min, max, isArray, int } = options;

  const validationOptionsValue: ValidationOptions = { each: isArray };

  const decorators: PropertyDecorator[] = [CommonProperty(options)];

  if (int) {
    decorators.push(IsInt(validationOptionsValue));
  } else {
    decorators.push(IsNumber({}, validationOptionsValue));
  }

  if (min != undefined) {
    decorators.push(Min(min, validationOptionsValue));
  }

  if (max != undefined) {
    decorators.push(Max(max, validationOptionsValue));
  }

  return CombinePropertyDecorators(...decorators);
}
