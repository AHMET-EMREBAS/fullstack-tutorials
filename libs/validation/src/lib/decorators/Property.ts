import { BooleanProperty } from './BooleanProperty';
import { CombinePropertyDecorators } from './CombinePropertyDecorators';
import { CommonPropertyOptions } from './CommonProperty';
import { DateProperty, DatePropertyOptions } from './DateProperty';
import { NumberProperty, NumberPropertyOptions } from './NumberProperty';
import { StringProperty, StringPropertyOptions } from './StringProperty';

export type PropertyType = 'string' | 'number' | 'boolean' | 'date';

type ATF<T, PT extends PropertyType> = { type?: PT } & T;

export type ProperyOptions =
  | ATF<StringPropertyOptions, 'string'>
  | ATF<NumberPropertyOptions, 'number'>
  | ATF<DatePropertyOptions, 'date'>
  | ATF<CommonPropertyOptions, 'boolean'>;

export function Property(options: ProperyOptions) {
  const { type } = options;
  if (type === 'string') {
    return StringProperty(options);
  } else if (type === 'number') {
    return NumberProperty(options);
  } else if (type === 'boolean') {
    return BooleanProperty(options);
  } else if (type === 'date') {
    return DateProperty(options);
  }
  return CombinePropertyDecorators(StringProperty(options));
}
