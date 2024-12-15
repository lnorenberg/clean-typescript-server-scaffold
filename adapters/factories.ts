import ErrorAdapter from './error-adapter';
import HealthRequestHandler from './http/request-handlers/health';

export function makeErrorAdapter() {
  return new ErrorAdapter();
}

export function makeHealthRequestHandler() {
  return new HealthRequestHandler();
}
