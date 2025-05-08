import { HttpError } from '../drivers/http-driver-interface';

export interface ApplicationErrorAdapter {
  toHttp(error: unknown): HttpError;
}
