import { Post as __Post } from '@nestjs/common';
import { CombineMethodDecorators } from '@techbir/common';
import {
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

/**
 * HTTP Post method
 * @param entity
 * @returns
 */
export function Post(path: string) {
  return CombineMethodDecorators(
    __Post(path),
    ApiCreatedResponse(),
    ApiUnprocessableEntityResponse(),
    ApiInternalServerErrorResponse(),
    ApiUnauthorizedResponse()
  );
}
