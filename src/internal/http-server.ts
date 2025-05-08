import HealthRequestHandler from '../adapters/http/request-handlers/health';
import { makeHttpDriver } from '../drivers/factories';
import { HttpMethod } from '../drivers/http-driver-interface';

export const setUpHttpServer = () => {
  const server = makeHttpDriver();

  server.registerEndpoint(HttpMethod.GET, '/health', new HealthRequestHandler());

  server.start();
};
