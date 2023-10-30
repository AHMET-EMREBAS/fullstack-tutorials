import { Delete as __Delete } from '@nestjs/common';
import { CombineMethodDecorators } from '@techbir/common';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

/**
 * HTTP Delete method
 * @param entity
 * @returns
 */
export function Delete(path: string) {
  return CombineMethodDecorators(
    __Delete(path),
    ApiOkResponse(),
    ApiNotFoundResponse(),
    ApiInternalServerErrorResponse(),
    ApiUnauthorizedResponse()
  );
}
