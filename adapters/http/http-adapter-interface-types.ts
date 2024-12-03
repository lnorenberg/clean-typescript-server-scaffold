import { DomainError, ErrorCode } from "../../business/types"
import { HttpStatus } from "../../drivers/http-driver-interface"

export interface HttpError extends Error {
    status: HttpStatus,
    body: {
        title: string,
        description: string,
        code: ErrorCode,
        details?: [],
    }
}

export interface HttpErrorAdapter {
    parse(error: DomainError): HttpError
}