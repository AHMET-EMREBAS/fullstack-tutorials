import { Get as __Get } from '@nestjs/common';
import { ClassConstructor, CombineMethodDecorators } from '@techbir/common';

/**
 * HTTP Get method
 * @param entity
 * @returns
 */
export function Get<T = unknown>(entity: ClassConstructor<T>) {
  return CombineMethodDecorators(__Get());
}
