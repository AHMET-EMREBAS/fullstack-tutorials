import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_TOKEN = 'IS_PUBLIC_TOKEN';

export function IsPublic() {
  return SetMetadata(IS_PUBLIC_TOKEN, true);
}
