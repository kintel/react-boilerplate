import dotenv from 'dotenv-safe';
import assert from 'assert';

dotenv.load(); // loads .env into process.env

const PORT = process.env.PORT || 7070;

const DATABASE = process.env.DATABASE || process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || process.env.MONGODB_URI;

if (typeof DATABASE !== 'string' || DATABASE.length === 0) {
  throw new Error('DATABASE not defined');
}

const config = {
  PORT: PORT,
  DATABASE: DATABASE,
  AUTH0_DOMAIN: 'mkplayground.auth0.com',
  AUTH0_CLIENT_SECRET: new Buffer(process.env.AUTH0_CLIENT_SECRET, 'base64'),
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID
};

export default config;
