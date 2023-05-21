import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { responseHandler } from 'src/helpers/response-handler';
import { StatusCodes } from 'src/common/enums/status-codes';
import { IncomingMessage } from 'http';
import { Response } from 'express';

export const getStatusCode = <T>(exception: T): number => {
    return exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
};

export const getErrorMessage = <T>(exception: T): string => {


    if (exception instanceof HttpException) {
        const { message } = exception;
        const response = exception.getResponse() as ErrorResponse;
        const messageArray = typeof response === 'object' && response.hasOwnProperty('message') ? response.message : null;  //we use the typeof operator to check if response is an object and has a message property. If it does, we assign the value of response.message to messageArray. Otherwise, we set messageArray to null

        return Array.isArray(messageArray) ? messageArray.join(' and ') : message;
    }
    return null;
};

@Catch(HttpException)
export class HttpExceptionFilter<T> implements ExceptionFilter { // this filter is used for handling http errors
    catch(exception: T, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<IncomingMessage>();
        const statusCode = getStatusCode<T>(exception);
        const message = getErrorMessage<T>(exception);

        let ErroResponse = responseHandler(null, message, 0, statusCode == 403 ? StatusCodes.FORBIDDEN : statusCode == 401 ? StatusCodes.UNAUTHORIZED : statusCode == 400 ? StatusCodes.BAD_REQUEST : StatusCodes.INTERNAL_SERVER_ERROR);

        response.status(statusCode).json({
            timestamp: new Date().toISOString(),
            path: request.url,
            ...ErroResponse,
        });
    }
}