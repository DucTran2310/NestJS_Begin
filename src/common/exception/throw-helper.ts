import { NotFoundException, BadRequestException } from '@nestjs/common';

export const throwIfNotFound = (entity: any, message = 'Data not found') => {
  if (!entity) throw new NotFoundException(message);
};

export const throwIf = (condition: boolean, message = 'Invalid request') => {
  if (condition) throw new BadRequestException(message);
};