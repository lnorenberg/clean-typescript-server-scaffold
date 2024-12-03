export enum ErrorCode {
    USER_AUTH_FAILED = 'USER_AUTHENTICATION_FAILED',
    INTERNAL_ERROR = 'INTERNAL_ERROR',
}

export interface DomainError extends Error {
    code: ErrorCode;
}
