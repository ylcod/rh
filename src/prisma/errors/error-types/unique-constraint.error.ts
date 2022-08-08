import { ConflictException } from '@nestjs/common';
import { PrismaClientError } from '../prisma-client-error.interface';

export class UniqueConstraintError extends ConflictException {
  constructor(err: PrismaClientError) {
    super(err.meta.message);
  }
}
