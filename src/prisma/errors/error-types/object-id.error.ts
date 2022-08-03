import { BadRequestException } from '@nestjs/common';
import { PrismaClientError } from '../prisma-client-error.interface';

export class ObjectIdError extends BadRequestException {
  constructor(err: PrismaClientError) {
    super(err.meta.message);
  }
}
