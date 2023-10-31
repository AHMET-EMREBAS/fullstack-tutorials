import { SetMetadata } from '@nestjs/common';

export const PERMISSION = 'PERMISSION';

export function HasPermission(permission: string) {
  return SetMetadata(PERMISSION, permission);
}
