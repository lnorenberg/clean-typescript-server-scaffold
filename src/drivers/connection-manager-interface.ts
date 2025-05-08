export interface ConnectionManager {
  connect(): Promise<void>;
  isConnected(): boolean | Promise<boolean>;
}
