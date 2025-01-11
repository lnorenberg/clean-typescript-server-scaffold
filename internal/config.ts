import dotenv from '@dotenvx/dotenvx';

dotenv.config();

export const http = {
  port: 3000,
};

export const mongo = {
  uri: process.env.MONGO_URI || 'mongodb://localhost:27017/test',
};
