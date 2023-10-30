import { SetMetadata } from '@nestjs/common';

const PERMISSION = 'PERMISSION';
/**
 * Set required permission metadata
 * @param permission 
 * @returns 
 */
export function Permission(permission: string) {
  return SetMetadata(PERMISSION, permission);
}
