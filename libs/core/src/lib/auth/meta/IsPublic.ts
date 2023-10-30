import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC = 'IS_PUBLIC';

/**
 * Define resource route as public
 * @returns
 */
export function IsPublic() {
  return SetMetadata(IS_PUBLIC, true);
}
