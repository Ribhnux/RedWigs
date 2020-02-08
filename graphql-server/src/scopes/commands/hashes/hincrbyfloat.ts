import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";

export type HIncrByArg = {
  key: string;
  field: string;
  increment: number;
};

export const _hincrbyfloat: ResolverFunction<HIncrByArg> = async (
  root,
  { key, field, increment },
  ctx
): Promise<any> => {
  try {
    const reply = await redisClient.hincrbyfloat(key, field, increment);
    return reply;
  } catch (err) {
    return err.message;
  }
};

export const typeDefs = gql`
  extend type Mutation {
    """
    Increment the float value of a hash field by the given amount.
    [Read more >>](https://redis.io/commands/hincrby)
    """
    _hincrbyfloat(key: String!, field: String!, increment: Float!): Float
  }
`;
