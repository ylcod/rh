import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { DatabaseError } from './error-types/database.error';
import { ObjectIdError } from './error-types/object-id.error';
import { UniqueConstraintError } from './error-types/unique-constraint.error';
import { PrismaClientError } from './prisma-client-error.interface';

@Injectable()
export class DatabaseInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        if (this.isPrismaError(err)) {
          err = this.handleDatabaseErrors(err);
        }

        if (err instanceof DatabaseError) {
          throw new BadRequestException(err.message);
        }

        throw err;
      }),
    );
  }

  private isPrismaError(err: PrismaClientError): boolean {
    return (
      typeof err.code === 'string' &&
      typeof err.clientVersion === 'string' &&
      (typeof err.meta === 'undefined' || typeof err.meta === 'object')
    );
  }

  private handleDatabaseErrors(err: PrismaClientError): Error {
    enum PrismaErrorsCode {
      InconsistentColumnData = 'P2023',
      uniqueConstraint = 'P2002',
    }

    switch (err.code) {
      case PrismaErrorsCode.InconsistentColumnData:
        return new ObjectIdError(err);

      case PrismaErrorsCode.uniqueConstraint:
        return new UniqueConstraintError(err);

      default:
        return new DatabaseError(err.message);
    }
  }
}
