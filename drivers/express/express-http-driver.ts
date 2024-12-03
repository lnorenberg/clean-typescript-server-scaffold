import express, { Request, Response, NextFunction } from 'express';

import { HttpDriver, HttpMethod, HttpMiddleware, HttpRequestHandler } from '../http-driver-interface';

export class ExpressHttpDriver implements HttpDriver {
    private expressApp;
    
    constructor() {
        this.expressApp = express();
    }

    public registerEndpoint(method: HttpMethod, path: string, handler: HttpRequestHandler): void {
        const expressRequestHandler = this.adaptRequestHandler(handler);
        this.expressApp[method](path, expressRequestHandler);
    }

    public registerCommonMiddlewares(handlers: HttpMiddleware[]): void {
        this.expressApp.use(
            ...handlers.map(this.adaptMiddleware),
        );
    }

    private adaptMiddleware() {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {

            } catch (error) {
                
            }
        };
    }

    private adaptRequestHandler(handler: HttpRequestHandler) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const result = await handler.handle({
                    body: req.body,
                    headers: req.headers,
                    params: req.params,
                });

                if (result.headers) {
                    Object.entries(result.headers).forEach(([key, value]) => {
                        res.header(key, value);
                    })
                }

                if (result.body) {
                    res.status(result.status);
                    res.send(result.body);
                    return;
                }

                res.sendStatus(result.status);
            } catch (error) {
                console.error(error);
                next(error);
            }
        };
    }
}