import { EntityAction } from '@ngrx/data';

export function parseNgrxErrors(error: EntityAction): string {
  const message = error.payload.data.error.error.error.message;

  if (message.join) {
    return message.join(',');
  }
  return message;
}
