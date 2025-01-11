import mongoose, { Mongoose } from 'mongoose';
import { mongo } from '../../internal/config';
import { ConnectionManager } from '../connection-manager-interface';

export default class MongoDBConnectionManager implements ConnectionManager {
  private connectionUri: string;

  private mongoose?: Mongoose;

  constructor() {
    this.connectionUri = mongo.uri;
  }

  async connect(): Promise<void> {
    this.mongoose = await mongoose.connect(this.connectionUri);
  }

  isConnected(): boolean {
    return !!this.mongoose?.connection;
  }
}
