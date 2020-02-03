import { gql } from "apollo-server";
import { ResolverFunction, IntResp, ErrResp } from "@typings";
import { redisClient } from "@adapters/redis";

export type IncrByFloatArg = {
  key: string;
  increment: number;
};

export const _incrbyfloat: ResolverFunction<IncrByFloatArg> = async (
  root,
  { key, increment },
  ctx
): Promise<IntResp | ErrResp> => {
  try {
    const reply = await redisClient.incrbyfloat(key, increment);
    return reply;
  } catch (err) {
    return err.message;
  }
};

export const schema = gql`
  extend type Mutation {
    """
    Increment the float value of a key by the given amount. [See more >>](https://redis.io/commands/incrbyfloat)
    """
    _incrbyfloat(key: String!, increment: Float!): RespBulk
  }
`;
