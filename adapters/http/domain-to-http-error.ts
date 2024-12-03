import UserAuthenticationFailedError from "../../business/errors/user-authentication-failed";
import { DomainError } from "../../business/types";
import { HttpError, HttpErrorAdapter } from "./http-adapter-interface-types";

export default class DomainToHttpErrorAdapter implements HttpErrorAdapter {
    public parse(domainError: DomainError): HttpError {
        if (domainError instanceof UserAuthenticationFailedError) return 
    }
}