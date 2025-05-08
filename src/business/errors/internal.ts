import { JsonSerializable } from '../../drivers/json-interface';
import { ErrorCode } from '../types';
import BaseDomainError from './base';

export default class InternalError extends BaseDomainError {
  public code = ErrorCode.INTERNAL_ERROR;

  public name = 'Internal Error';

  public details?: JsonSerializable | undefined;

  constructor(cause?: Error) {
    const message = 'An unexpected error occurred while proccessing your request. Please'
      + 'try again later or contact our support representatives.';

    super(message, { cause });
  }
}
