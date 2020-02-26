import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";
import { convertToJSONOrKeep } from "@utils/json";

export type PublishArgs = {
  channel: string;
  message: any;
};

export const _publish: ResolverFunction<PublishArgs> = async (
  root,
  { channel, message },
  ctx,
  info
): Promise<IntResp> => {
  try {
    const msg = convertToJSONOrKeep(message);
    const reply = await redisClient.publish(channel, msg);

    return reply;
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  extend type Mutation {
    """
    **PUBLISH channel message**

    Post a message to a channel. [Read more >>](https://redis.io/commands/publish)
    """
    _publish(channel: String!, message: JSON!): Int
  }
`;
