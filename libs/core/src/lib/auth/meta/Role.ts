import { SetMetadata } from '@nestjs/common';

const ROLE = 'Role';
/**
 * Set required role metadata
 * @param role 
 * @returns 
 */
export function Role(role: string) {
  return SetMetadata(ROLE, role);
}
