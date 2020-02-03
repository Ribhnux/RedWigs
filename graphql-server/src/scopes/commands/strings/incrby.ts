import { gql } from "apollo-server";
import { ResolverFunction, IntResp, ErrResp } from "@typings";
import { redisClient } from "@adapters/redis";

export type IncrByArg = {
  key: string;
  increment: number;
};

export const _incrby: ResolverFunction<IncrByArg> = async (
  root,
  { key, increment },
  ctx
): Promise<IntResp | ErrResp> => {
  try {
    const reply = await redisClient.incrby(key, increment);
    return reply;
  } catch (err) {
    return err.message;
  }
};

export const schema = gql`
  extend type Mutation {
    """
    Increment the integer value of a key by the given amount. [See more >>](https://redis.io/commands/incrby)
    """
    _incrby(key: String!, increment: Int!): Int
  }
`;
