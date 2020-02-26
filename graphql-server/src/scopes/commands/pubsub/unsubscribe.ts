import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redwigsClient, REDWIGS_PUBSUB_CHANNEL_DATA } from "@adapters/redwigs";
import { subscriber } from "@adapters/pubsub";
import { redisClient } from "@adapters/redis";

export type UnsubscribeArgs = {
  channels?: string[];
};

const unsubscribeAll = async (): Promise<any> => {
  const allChannels: string[] = await redwigsClient.send_command(
    "PUBSUB",
    "CHANNELS"
  );

  await redwigsClient.hdel(REDWIGS_PUBSUB_CHANNEL_DATA, ...allChannels);

  const redisClientMulti = redisClient.multi();
  allChannels.forEach(channel => redisClientMulti.publish(channel, "null"));
  await redisClientMulti.exec();

  const unsubsWithoutChannelReply = await subscriber.unsubscribe(
    ...allChannels
  );

  return unsubsWithoutChannelReply;
};

export const _unsubscribe: ResolverFunction<UnsubscribeArgs> = async (
  root,
  { channels }
): Promise<IntResp> => {
  try {
    if (!channels) return await unsubscribeAll();

    const redisClientMulti = redisClient.multi();
    const redwigsClientMulti = redwigsClient.multi();
    channels.forEach(channel => {
      redwigsClientMulti.hdel(REDWIGS_PUBSUB_CHANNEL_DATA, channel);
      redisClientMulti.publish(channel, "null");
    });

    await redwigsClientMulti.exec();
    await redisClientMulti.exec();
    const unsubsReply = await subscriber.unsubscribe(...channels);
    return unsubsReply;
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  extend type Mutation {
    """
    **UNSUBSCRIBE [channel [channel ...]]**

    Stop listening for messages posted to the given channels.
    [Read more >>](https://redis.io/commands/unsubscribe)
    """
    _unsubscribe(channels: [String]): Int
  }
`;
