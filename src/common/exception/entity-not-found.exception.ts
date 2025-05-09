import { HttpException, HttpStatus } from '@nestjs/common';

export class EntityNotFoundException extends HttpException {
  constructor(entityName = 'Entity') {
    super(`${entityName} not found`, HttpStatus.NOT_FOUND);
  }
}