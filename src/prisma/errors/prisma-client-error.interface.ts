import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

export interface PrismaClientError extends PrismaClientKnownRequestError {
  meta?: {
    target?: string;
    message?: string;
  };
}
