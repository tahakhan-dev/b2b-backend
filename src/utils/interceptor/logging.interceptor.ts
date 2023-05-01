import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';


@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  constructor() { }
  m
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const userAgent = request.get('user-agent') || '';
    const { ip, method, path: url } = request;

    this.logger.log(
      `${method} ${url} ${userAgent} ${ip}: ${context.getClass().name} ${context.getHandler().name
      } invoked...`,
    );

    const now = Date.now();
    return next.handle().pipe( // next.handle which essentially will execute our route handler 
      tap((res) => { // tap is just a side effect operator which will allow us to actually get access to the response of the route handler
        this.logger.log(`After... ${Date.now() - now}ms`)
        // const response = context.switchToHttp().getResponse();

        // const { statusCode } = response;

        // this.logger.log(
        //   `${method} ${url} ${statusCode} ${res} - ${userAgent} ${ip}: ${Date.now() - now
        //   }ms`,
        // );
        // this.logger.debug('Response:', res);
      }),
      catchError((err) => {
        this.logger.error(err);
        return throwError(() => err);
      }),
    );
  }
}
