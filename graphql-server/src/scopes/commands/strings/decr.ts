import { gql } from "apollo-server";
import { ResolverFunction, IntResp, ErrResp } from "@typings";
import { redisClient } from "@adapters/redis";

export type DecrArg = {
  key: string;
};

export const _decr: ResolverFunction<DecrArg> = async (
  root,
  { key },
  ctx
): Promise<IntResp | ErrResp> => {
  try {
    const reply = await redisClient.decr(key);
    return reply;
  } catch (err) {
    return err.message;
  }
};

export const typeDefs = gql`
  extend type Mutation {
    """
    Decrement the integer value of a key by one. [See more >>](https://redis.io/commands/decr)
    """
    _decr(key: String!): Int
  }
`;
