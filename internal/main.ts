import ErrorAdapter from '../adapters/error-adapter';
import HealthRequestHandler from '../adapters/http/request-handlers/health';
import { ExpressHttpDriver } from '../drivers/express/express-http-driver';
import { HttpMethod } from '../drivers/http-driver-interface';

export const setUpHttpServer = () => {
  const errorAdapter = new ErrorAdapter();
  const server = new ExpressHttpDriver(errorAdapter);

  server.registerEndpoint(HttpMethod.GET, '/health', new HealthRequestHandler());

  server.start();
};
