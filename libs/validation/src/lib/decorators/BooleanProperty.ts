import { IsBoolean, ValidationOptions } from 'class-validator';
import { CombinePropertyDecorators } from './CombinePropertyDecorators';
import { CommonProperty, CommonPropertyOptions } from './CommonProperty';

/**
 * Boolean property validation
 * @param options
 * @returns
 */
export function BooleanProperty(
  options: CommonPropertyOptions
): PropertyDecorator {
  const { isArray } = options;
  const validationOptionsValue: ValidationOptions = { each: isArray };

  const decorators: PropertyDecorator[] = [
    IsBoolean(validationOptionsValue),
    CommonProperty(options),
  ];

  return CombinePropertyDecorators(...decorators);
}
