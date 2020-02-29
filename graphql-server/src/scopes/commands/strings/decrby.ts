import { gql } from "apollo-server";
import { ResolverFunction, IntResp, ErrResp } from "@typings";
import { redisClient } from "@adapters/redis";

export type DecrByArg = {
  key: string;
  decrement: number;
};

export const _decrby: ResolverFunction<DecrByArg> = async (
  root,
  { key, decrement },
  ctx
): Promise<IntResp | ErrResp> => {
  try {
    const reply = await redisClient.decrby(key, decrement);
    return reply;
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  extend type Mutation {
    """
    **DECRBY key decrement**

    Decrement the integer value of a key by the given number. [Read more >>](https://redis.io/commands/decrby)
    """
    _decrby(key: String!, decrement: Int!): Int
  }
`;
