import { makeErrorAdapter } from '../adapters/factories';
import { ExpressHttpDriver } from './express/express-http-driver';

export function makeHttpDriver() {
  const errorAdapter = makeErrorAdapter();
  return new ExpressHttpDriver(errorAdapter);
}
