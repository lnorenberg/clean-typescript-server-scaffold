import { JsonSerializable } from '../../drivers/json-interface';
import { DomainError, DomainErrorOptions, ErrorCode } from '../types';

export default abstract class BaseDomainError extends Error implements DomainError {
  public abstract code: ErrorCode;

  public abstract name: string;

  public abstract details?: JsonSerializable;

  constructor(message: string, options?: DomainErrorOptions) {
    super(message, { cause: options?.cause } );
  }
}
