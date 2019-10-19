import { subsRedisClient } from '../adapters/redis';
import { schemaInitialization } from './init';

export const patternMessageKeyspaceChangeListener = async (
  channel: string,
  message: string
) => {
  await schemaInitialization();
};

export const subscribeOnSchemaChange = () => {
  subsRedisClient.on('ready', () =>
    subsRedisClient.config('SET', 'notify-keyspace-events', 'KEA')
  );
  subsRedisClient.psubscribe('__keyspace@0__:redwigs:types:*');
  subsRedisClient.psubscribe('__keyspace@0__:redwigs:typeset:*');
  subsRedisClient.on('pmessage', patternMessageKeyspaceChangeListener);
};
