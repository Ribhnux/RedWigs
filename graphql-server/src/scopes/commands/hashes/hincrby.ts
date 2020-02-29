import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";

export type HIncrByArg = {
  key: string;
  field: string;
  increment: number;
};

export const _hincrby: ResolverFunction<HIncrByArg> = async (
  root,
  { key, field, increment },
  ctx
): Promise<IntResp> => {
  try {
    const reply = await redisClient.hincrby(key, field, increment);
    return reply;
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  extend type Mutation {
    """
    Increment the integer value of a hash field by the given number. [Read more >>](https://redis.io/commands/hincrby)
    """
    _hincrby(key: String!, field: String!, increment: Int!): Int
  }
`;
