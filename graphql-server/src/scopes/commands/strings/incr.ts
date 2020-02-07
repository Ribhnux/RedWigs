import { gql } from "apollo-server";
import { ResolverFunction, IntResp, ErrResp } from "@typings";
import { redisClient } from "@adapters/redis";

export type IncrArg = {
  key: string;
};

export const _incr: ResolverFunction<IncrArg> = async (
  root,
  { key },
  ctx
): Promise<IntResp | ErrResp> => {
  try {
    const reply = await redisClient.incr(key);
    return reply;
  } catch (err) {
    return err.message;
  }
};

export const typeDefs = gql`
  extend type Mutation {
    """
    Increment the integer value of a key by one. [Read more >>](https://redis.io/commands/incr)
    """
    _incr(key: String!): Int
  }
`;
