import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC = 'IS_PUBLIC';

/**
 * Public resource
 * @returns
 */
export function IsPublic() {
  return SetMetadata(IS_PUBLIC, true);
}
