import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";

export type ExpireArg = {
  key: string;
  seconds: number;
};

export const _expire: ResolverFunction<ExpireArg> = async (
  root,
  { key, seconds },
  ctx
): Promise<IntResp> => {
  try {
    const reply = await redisClient.expire(key, seconds);
    return reply;
  } catch (err) {
    return err.message;
  }
};

export const typeDefs = gql`
  extend type Mutation {
    """
    Set a key's time to live in seconds. [Read more >>](https://redis.io/commands/expire)
    """
    _expire(key: String!, seconds: Int!): Int
  }
`;
