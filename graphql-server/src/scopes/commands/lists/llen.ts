import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";

export type LLenArgs = {
  key: string;
};

export const _llen: ResolverFunction<LLenArgs> = async (
  root,
  { key },
  ctx
): Promise<IntResp> => {
  try {
    const reply = await redisClient.llen(key);
    return reply;
  } catch (err) {
    return err.message;
  }
};

export const typeDefs = gql`
  extend type Query {
    """
    Get the length of a list. [Read more >>](https://redis.io/commands/llen)
    """
    _llen(key: String!): Int
  }
`;
