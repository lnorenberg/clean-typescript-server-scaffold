import { DomainError, ErrorCode } from "../types";

export default class UserAuthenticationFailedError implements DomainError {
    public code = ErrorCode.USER_AUTH_FAILED;
    public name = 'Authentication Failed';
    public message = `We couldn't authenticate the user with the provided access token.`;
}
