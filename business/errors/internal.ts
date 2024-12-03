import { DomainError, ErrorCode } from "../types";

export default class InternalError implements DomainError {
    public code = ErrorCode.INTERNAL_ERROR;
    public name = 'Internal Error';
    public message = `An unexpected error occurred while proccessing your request. Please try again later or contact our support representatives.`;
}
