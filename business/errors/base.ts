import { JsonSerializable } from "../../drivers/json-interface";
import { DomainError, ErrorCode } from "../types"

export default abstract class BaseDomainError extends Error implements DomainError {
    public code: ErrorCode = ErrorCode.INTERNAL_ERROR;
    public name = 'Internal Error';
    public message = `An unexpected error occurred while proccessing your request. Please try again later or contact our support representatives.`;
    public details?: JsonSerializable;

    constructor(message?: string, details?: JsonSerializable, cause?: Error) {
        super(message, cause)
    }
}