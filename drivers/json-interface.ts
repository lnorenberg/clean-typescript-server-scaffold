export type JsonSerializable = string
  | number
  | boolean
  | null
  | JsonObject
  | JsonArray;

interface JsonObject {
  [key: string]: JsonSerializable;
}

interface JsonArray extends Array<JsonSerializable> {}
