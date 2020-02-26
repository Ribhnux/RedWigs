import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redwigsClient, REDWIGS_PUBSUB_CHANNEL_DATA } from "@adapters/redwigs";
import { subscriber } from "@adapters/pubsub";
import { redisClient } from "@adapters/redis";
import uniq from "lodash/uniq";

export type PUnsubscribeArgs = {
  patterns?: string[];
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

export const _punsubscribe: ResolverFunction<PUnsubscribeArgs> = async (
  root,
  { patterns }
): Promise<IntResp> => {
  try {
    if (!patterns) return await unsubscribeAll();

    const allChannelsWithPatternsReq = patterns.map(pattern =>
      redisClient.send_command("PUBSUB", "CHANNELS", pattern)
    );

    const allChannelsMatchedPatterns = await Promise.all(
      allChannelsWithPatternsReq
    );

    const uniqOfAllChannelsMatchedPatterns = uniq(
      allChannelsMatchedPatterns.flat()
    );

    const redwigsClientMulti = redwigsClient.multi();
    const redisClientMulti = redisClient.multi();
    uniqOfAllChannelsMatchedPatterns.forEach(channel => {
      redwigsClientMulti.hdel(REDWIGS_PUBSUB_CHANNEL_DATA, channel);
      redisClientMulti.publish(channel, "null");
    });

    await redwigsClientMulti.exec();
    await subscriber.punsubscribe(...patterns);
    const unsubsReply = await subscriber.unsubscribe(
      ...uniqOfAllChannelsMatchedPatterns
    );
    return unsubsReply;
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  extend type Mutation {
    """
    **PUNSUBSCRIBE [pattern [pattern ...]]**

    Stop listening for messages posted to channels matching the given patterns.
    [Read more >>](https://redis.io/commands/punsubscribe)
    """
    _punsubscribe(patterns: [String]): Int
  }
`;
