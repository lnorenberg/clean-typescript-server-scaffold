import { JsonSerializable } from '../drivers/json-interface';

export enum ErrorCode {
  USER_AUTH_FAILED = 'USER_AUTHENTICATION_FAILED',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
}

export interface DomainErrorOptions {
  cause?: Error;
}

export interface DomainError extends Error {
  code: ErrorCode;
  name: string;
  details?: JsonSerializable;
}
