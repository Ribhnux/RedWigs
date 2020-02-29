import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";

export type HLenArg = {
  key: string;
};

export const _hlen: ResolverFunction<HLenArg> = async (
  root,
  { key },
  ctx
): Promise<IntResp> => {
  try {
    const reply = await redisClient.hlen(key);
    return reply;
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  extend type Query {
    """
    Get the number of fields in a hash. [Read more >>](https://redis.io/commands/hlen)
    """
    _hlen(key: String!): Int
  }
`;
