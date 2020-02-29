import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";

export type PFCountArgs = {
  keys: string[];
};

export const _pfcount: ResolverFunction<PFCountArgs> = async (
  root,
  { keys },
  ctx
): Promise<IntResp> => {
  try {
    const reply = await redisClient.pfcount(...keys);
    return reply;
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  extend type Query {
    """
    Return the approximated cardinality of the set(s) observed by the HyperLogLog at key(s).
    [Read more >>](https://redis.io/commands/pfadd)
    """
    _pfcount(keys: [String!]!): Int
  }
`;
