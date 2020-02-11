import gql from "graphql-tag";
import { ResolverFunction } from "@typings";
import { redisClient } from "@adapters/redis";

export type ZRankArgs = {
  key: string;
  member: string;
};

export const _zrank: ResolverFunction<ZRankArgs> = async (
  root,
  { key, member },
  ctx
): Promise<number> => {
  try {
    const reply = await redisClient.zrank(key, member);

    return reply;
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  extend type Query {
    """
    **ZRANK key member**

    Determine the index of a member in a sorted set. [Read more >>](https://redis.io/commands/zrank)
    """
    _zrank(key: String!, member: String!): Int
  }
`;
