import { Get as __Get } from '@nestjs/common';
import { CombineMethodDecorators } from '@techbir/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

/**
 * HTTP Get method
 * @param entity
 * @returns
 */
export function Get(path: string) {
  return CombineMethodDecorators(
    __Get(path),
    ApiOkResponse(),
    ApiInternalServerErrorResponse(),
    ApiUnauthorizedResponse()
  );
}