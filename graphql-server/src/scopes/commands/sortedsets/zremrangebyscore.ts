import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";

export type ZRemRangeByScorergs = {
  key: string;
  min: string;
  max: string;
};

export const _zremrangebyscore: ResolverFunction<ZRemRangeByScorergs> = async (
  root,
  { key, min, max },
  ctx
): Promise<IntResp> => {
  try {
    const reply = await redisClient.zremrangebyscore(key, min, max);
    return reply;
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  extend type Mutation {
    """
    **ZREMRANGEBYSCORE key min max**

    Remove all members in a sorted set within the given scores.
    [Read more >>](https://redis.io/commands/zremrangebyscore)
    """
    _zremrangebyscore(key: String!, min: String!, max: String!): Int
  }
`;
