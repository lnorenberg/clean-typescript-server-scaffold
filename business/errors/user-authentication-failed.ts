import { JsonSerializable } from '../../drivers/json-interface';
import { ErrorCode } from '../types';
import BaseDomainError from './base';

export default class UserAuthenticationFailedDomainError extends BaseDomainError {
  public code = ErrorCode.USER_AUTH_FAILED;

  public name = 'Authentication Failed';

  public details?: JsonSerializable | undefined;

  constructor() {
    super('We couldn\'t authenticate the user with the provided access token.');
  }
}
