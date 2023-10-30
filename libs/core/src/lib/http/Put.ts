import { Put as __Put } from '@nestjs/common';
import { CombineMethodDecorators } from '@techbir/common';
import {
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

/**
 * HTTP Put method
 * @param entity
 * @returns
 */
export function Put(path: string) {
  return CombineMethodDecorators(
    __Put(path),
    ApiCreatedResponse(),
    ApiUnprocessableEntityResponse(),
    ApiInternalServerErrorResponse(),
    ApiUnauthorizedResponse()
  );
}
