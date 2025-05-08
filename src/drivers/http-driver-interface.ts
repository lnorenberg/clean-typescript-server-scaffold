import { ErrorCode } from '../business/types';
import { JsonSerializable } from './json-interface';
import { OutgoingHttpHeaders, IncomingHttpHeaders } from 'http2';

export enum HttpMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  PATCH = 'patch',
}

export enum HttpStatus {
  OK = 200,
  UNAUTHORIZED = 401,
  INTERNAL = 500,
}

export interface HttpDriver {
  start(): void;
  registerEndpoint(method: HttpMethod, path: string, handler: HttpRequestHandler): void;
  registerMiddleware(handler: HttpMiddleware): void;
}

export interface HttpMiddleware {
  execute(request: HttpRequest, response: HttpResponse): [
    (Partial<HttpRequest>) | undefined,
    Pick<HttpResponse, 'headers'> | undefined,
  ];
}

export interface HttpRequestHandler {
  handle(request: HttpRequest): HttpResponse | Promise<HttpResponse>;
}

export interface HttpResponse {
  status: HttpStatus,
  body?: JsonSerializable,
  headers?: OutgoingHttpHeaders
}

export interface HttpRequest {
  headers: IncomingHttpHeaders,
  params: Record<string, string>,
  body: unknown,
}

export interface HttpError {
  status: HttpStatus,
  title: string,
  description: string,
  code: ErrorCode,
  details?: JsonSerializable,
}
