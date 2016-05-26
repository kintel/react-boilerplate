import mongoose from 'mongoose';
import config from './config/config';

// FIXME: Only set this in development mode
mongoose.set('debug', false);

export function connect() {
  // Will auto-reconnect on list connection
  const thenable = mongoose.connect(config.DATABASE);

  mongoose.connection.on('connected', () => console.log(`Connected to ${config.DATABASE}`));
  mongoose.connection.on('open', () => console.log(`Opened ${config.DATABASE}`));
  mongoose.connection.on('error', console.log);
  mongoose.connection.on('close', () => console.log(`Closed ${config.DATABASE}`));

  process.on('SIGINT', close);

  return thenable;
}

export function close() {
  return mongoose.connection.close();
}
