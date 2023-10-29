import { ClassConstructor } from 'class-transformer';

export type ResourceControllerOptions = {
  entity: ClassConstructor<any>;
  createDto: ClassConstructor<any>;
  updateDto: ClassConstructor<any>;
};

export function ResourceController() {
  class __Controller {
    constructor() {}
  }

  return __Controller;
}
