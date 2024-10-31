import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { MongoError } from 'mongodb';
import { Request, Response } from 'express';

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(MongoExceptionFilter.name);

  catch(exception: MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Default to internal server error if not otherwise specified
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    // Handle MongoDB Duplicate Key Error
    if (exception.code === 11000) {
      status = HttpStatus.CONFLICT;
      message = 'Duplicate key error: A record with this value already exists';
    }

    // Log the error details
    this.logger.error(
      `MongoDB Error [${exception.code}]: ${message}`,
      exception.stack,
    );

    // Send formatted error response
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}