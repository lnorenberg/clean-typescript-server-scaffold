import { HttpStatus } from "../../../drivers/http-driver-interface";
import { JsonSerializable } from "../../../drivers/json-interface";
import { HttpError } from "../http-adapter-interface-types";

export class UnauthorizedHttpError implements HttpError {
    public status = HttpStatus.UNAUTHORIZED;
    public body: HttpError['body'];

    constructor(title: string, description: string, details?: JsonSerializable) {
        if (details) this

        this.body = {

        }
    }
}