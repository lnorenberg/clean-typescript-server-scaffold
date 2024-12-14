import { HttpRequestHandler, HttpResponse } from '../../../drivers/http-driver-interface';

export default class HealthRequestHandler implements HttpRequestHandler {
  handle(): HttpResponse {
    return {
      status: 200,
      body: {
        httpServer: 'Ok'
      },
    };
  }
};
