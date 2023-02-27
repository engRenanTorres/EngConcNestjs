import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, catchError } from 'rxjs';
import { MongoError } from 'typeorm';

@Injectable()
export class DatabaseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error.name === 'MongoServerError')
          throw new MongoError(error.message);
        else throw error;
      }),
    );
  }
}
