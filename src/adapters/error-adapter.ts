import BaseDomainError from '../business/errors/base';
import InternalError from '../business/errors/internal';
import UserAuthenticationFailedDomainError from '../business/errors/user-authentication-failed';
import { DomainError } from '../business/types';
import { ApplicationErrorAdapter } from './types';
import { HttpError, HttpStatus } from '../drivers/http-driver-interface';

export default class ErrorAdapter implements ApplicationErrorAdapter {
  public toHttp(error: unknown): HttpError {
    let status: HttpStatus = HttpStatus.INTERNAL;

    if (error instanceof UserAuthenticationFailedDomainError) status = HttpStatus.UNAUTHORIZED;

    const domainError = this.unknownToDomainError(error);

    return {
      status: status,
      code: domainError.code,
      description: domainError.message,
      title: domainError.name,
      details: domainError.details,
    };
  }

  private unknownToDomainError(error: unknown): DomainError {
    if (error instanceof BaseDomainError) return error;

    const cause = (error instanceof Error)
      ? error
      : undefined;

    return new InternalError(cause);
  }
}
