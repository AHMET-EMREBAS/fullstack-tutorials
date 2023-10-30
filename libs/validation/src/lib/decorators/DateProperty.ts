import { IsDate, MaxDate, MinDate, ValidationOptions } from 'class-validator';
import { CommonProperty, CommonPropertyOptions } from './CommonProperty';
import { CombinePropertyDecorators, DayNumber, Hour } from '@techbir/common';
import { IsBetweenHours, IsInDays, IsInHours, IsToday } from '../validators';

export class DatePropertyOptions extends CommonPropertyOptions {
  before?: Date;
  after?: Date;
  today?: boolean;
  days?: DayNumber[];
  hours?: Hour[];
  betweenHours?: { start: Hour; end: Hour };
}

export function DateProperty(options: DatePropertyOptions) {
  const { after, before, isArray, today, days, hours, betweenHours } = options;

  const validationOptionsValue: ValidationOptions = { each: isArray };

  const decorators = [IsDate(validationOptionsValue), CommonProperty(options)];

  if (after) {
    decorators.push(MinDate(after, validationOptionsValue));
  }

  if (before) {
    decorators.push(MaxDate(before, validationOptionsValue));
  }

  if (today) {
    decorators.push(IsToday(validationOptionsValue));
  }

  if (days && days.length > 0) {
    decorators.push(IsInDays(days, validationOptionsValue));
  }

  if (hours && hours.length > 0) {
    decorators.push(IsInHours(hours, validationOptionsValue));
  }

  if (betweenHours) {
    decorators.push(IsBetweenHours(betweenHours, validationOptionsValue));
  }

  return CombinePropertyDecorators(...decorators);
}
