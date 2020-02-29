import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";

export type LIndexArgs = {
  key: string;
  index: number;
};

export const _lindex: ResolverFunction<LIndexArgs> = async (
  root,
  { key, index },
  ctx
): Promise<string> => {
  try {
    const reply = await redisClient.lindex(key, index);
    return reply;
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  extend type Query {
    """
    **LINDEX key index**

    Get an element from a list by its index.
    [Read more >>](https://redis.io/commands/lindex)
    """
    _lindex(key: String!, index: Int!): String
  }
`;
