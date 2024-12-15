import express, { Request, Response, NextFunction } from 'express';
import {
  HttpDriver,
  HttpError,
  HttpMethod,
  HttpMiddleware,
  HttpRequest,
  HttpRequestHandler,
  HttpResponse,
} from '../http-driver-interface';
import ErrorAdapter from '../../adapters/error-adapter';
import { http as config } from '../../internal/config';

export class ExpressHttpDriver implements HttpDriver {
  private expressApp;

  private errorAdapter: ErrorAdapter;
    
  constructor(errorAdapter: ErrorAdapter) {
    this.expressApp = express();
    this.errorAdapter = errorAdapter;
  }

  public start() {
    this.expressApp.listen(config.port, () => {
      console.log(`Server is listening port ${config.port}`);
    });
  }

  public registerEndpoint(method: HttpMethod, path: string, handler: HttpRequestHandler): void {
    const expressRequestHandler = this.adaptRequestHandler(handler);
    this.expressApp[method](path, expressRequestHandler);
  }

  public registerMiddleware(handler: HttpMiddleware): void {
    this.expressApp.use(
      this.adaptMiddleware(handler),
    );
  }

  private adaptMiddleware(middleware: HttpMiddleware) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const adaptedRequest = this.adaptExpressReq(req);
        const adaptedResponse = this.adaptExpressRes(res);

        const [modifiedRequest, modifiedResponse] = middleware.execute(adaptedRequest, adaptedResponse);

        this.setExpressHeaders(modifiedResponse?.headers, res);

        if (modifiedRequest?.body) req.body = modifiedRequest.body;

        if (modifiedRequest?.headers) req.headers = modifiedRequest.headers;

        if (modifiedRequest?.params) req.params = modifiedRequest.params;

        next();
      } catch (error) {
        this.catchError(error, res, next);
      }
    };
  }

  private adaptRequestHandler(handler: HttpRequestHandler) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const adaptedRequest = this.adaptExpressReq(req);

        const response = await handler.handle(adaptedRequest);

        if (response.headers) this.setExpressHeaders(response.headers, res);

        if (response.body) {
          res.status(response.status);
          res.send(response.body);
          return;
        }

        res.sendStatus(response.status);
      } catch (error) {
        this.catchError(error, res, next);
      }
    };
  }

  private catchError(error: unknown, res: Response, next: NextFunction) {
    const httpError = this.errorAdapter.toHttp(error);
    this.respondWithError(httpError, res);
    next(error);
  }

  private respondWithError(error: HttpError, res: Response): void {
    res.status(error.status);
    res.send({
      code: error.code,
      title: error.title,
      description: error.description,
      details: error.details,
    });
  }

  private adaptExpressReq(req: Request): HttpRequest {
    return {
      body: req.body,
      headers: req.headers,
      params: req.params,
    };
  }

  private adaptExpressRes(res: Response): HttpResponse {
    return {
      headers: res.getHeaders(),
      status: res.statusCode,
    };
  }

  private setExpressHeaders(headers: HttpResponse['headers'], res: Response) {
    if (!headers) return;

    Object.entries(headers).forEach(
      ([key, value]) => value != undefined && res.setHeader(key, value),
    );
  }
}
