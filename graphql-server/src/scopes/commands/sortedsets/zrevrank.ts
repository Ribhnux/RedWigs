import gql from "graphql-tag";
import { ResolverFunction } from "@typings";
import { redisClient } from "@adapters/redis";

export type ZRevRankArgs = {
  key: string;
  member: string;
};

export const _zrevrank: ResolverFunction<ZRevRankArgs> = async (
  root,
  { key, member },
  ctx
): Promise<number> => {
  try {
    const reply = await redisClient.zrevrank(key, member);

    return reply;
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  extend type Query {
    """
    **ZREVRANK key member**

    Determine the index of a member in a sorted set, with scores ordered from high to low.
    [Read more >>](https://redis.io/commands/zrevrank)
    """
    _zrevrank(key: String!, member: String!): Int
  }
`;
