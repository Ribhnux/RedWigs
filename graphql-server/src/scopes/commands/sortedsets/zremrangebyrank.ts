import gql from "graphql-tag";
import { ResolverFunction } from "@typings";
import { redisClient } from "@adapters/redis";

export type ZRemRangeByRankArgs = {
  key: string;
  start: number;
  stop: number;
};

export const _zremrangebyrank: ResolverFunction<ZRemRangeByRankArgs> = async (
  root,
  { key, start, stop },
  ctx
): Promise<number> => {
  try {
    const reply = await redisClient.zremrangebyrank(key, start, stop);
    return reply;
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  extend type Mutation {
    """
    **ZREMRANGEBYRANK key start stop**

    Remove all members in a sorted set within the given indexes.
    [Read more >>](https://redis.io/commands/zremrangebyrank)
    """
    _zremrangebyrank(key: String!, start: Int!, stop: Int!): Int
  }
`;
