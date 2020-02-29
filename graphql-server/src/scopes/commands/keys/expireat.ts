import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";

export type ExpireAtArg = {
  key: string;
  timestamp: number;
};

export const _expireat: ResolverFunction<ExpireAtArg> = async (
  root,
  { key, timestamp },
  ctx
): Promise<IntResp> => {
  try {
    const reply = await redisClient.expireat(key, timestamp);
    return reply;
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  extend type Mutation {
    """
    **EXPIREAT key timestamp**

    Set the expiration for a key as a UNIX timestamp.
    [Read more >>](https://redis.io/commands/expireat)
    """
    _expireat(key: String!, timestamp: Int!): Int
  }
`;
