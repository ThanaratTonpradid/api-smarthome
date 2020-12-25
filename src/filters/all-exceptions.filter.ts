import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { sentenceCase } from 'change-case';
import { Request, Response } from 'express';

import { HttpExceptionResponse } from '../interfaces';

interface ErrorPayload {
  statusCode: number;
  errorCode: string;
  errorMessage: string | object;
  timestamp?: string;
  path?: string;
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private logger = new Logger(AllExceptionsFilter.name);
  private defaultErrorStatus = HttpStatus.INTERNAL_SERVER_ERROR;
  private defaultErrorCode = HttpStatus[HttpStatus.INTERNAL_SERVER_ERROR];
  private defaultErrorMessage = sentenceCase(this.defaultErrorCode);

  catch(exception: Error, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const error: ErrorPayload = {
      statusCode: this.defaultErrorStatus,
      errorCode: this.defaultErrorCode,
      errorMessage: exception.message || this.defaultErrorMessage,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    if (exception instanceof HttpException) {
      const errorResponse = exception.getResponse() as HttpExceptionResponse;
      error.statusCode = exception.getStatus();
      error.errorCode = errorResponse.errorCode || HttpStatus[error.statusCode];
      error.errorMessage = errorResponse.errorMessage || errorResponse.message;
    }

    const ignoreErrorLogStatus = [
      HttpStatus.UNAUTHORIZED,
      HttpStatus.BAD_REQUEST,
    ];
    if (!ignoreErrorLogStatus.includes(error.statusCode)) {
      this.logger.error(error);
    }
    response.status(error.statusCode).json(error);
  }
}
