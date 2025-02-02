import { ReasonPhrases, StatusCodes } from 'http-status-codes';

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly message: string;
  public readonly code: string;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.code = 'APP_ERROR';
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends AppError {
  constructor(message: string = ReasonPhrases.BAD_REQUEST) {
    super(StatusCodes.BAD_REQUEST, message);
  }
}
export class Forbidden extends AppError {
  constructor(message: string = ReasonPhrases.FORBIDDEN) {
    super(StatusCodes.FORBIDDEN, message);
  }
}

export class InternalServerError extends AppError {
  constructor(message: string = ReasonPhrases.INTERNAL_SERVER_ERROR) {
    super(StatusCodes.INTERNAL_SERVER_ERROR, message);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = ReasonPhrases.NOT_FOUND) {
    super(StatusCodes.NOT_FOUND, message);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = ReasonPhrases.UNAUTHORIZED) {
    super(StatusCodes.UNAUTHORIZED, message);
  }
}
