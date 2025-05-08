import { makeErrorAdapter } from '../adapters/factories';
import { ExpressHttpDriver } from './http/express-http-driver';

export function makeHttpDriver() {
  const errorAdapter = makeErrorAdapter();
  return new ExpressHttpDriver(errorAdapter);
}
