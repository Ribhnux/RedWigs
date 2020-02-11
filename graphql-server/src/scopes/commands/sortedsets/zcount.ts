import gql from "graphql-tag";
import { ResolverFunction } from "@typings";
import { redisClient } from "@adapters/redis";

export type ZCountArgs = {
  key: string;
  min: string;
  max: string;
};

export const _zcount: ResolverFunction<ZCountArgs> = async (
  root,
  { key, min, max },
  ctx
): Promise<number> => {
  try {
    const reply = await redisClient.zcount(key, min, max);

    return reply;
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  extend type Query {
    """
    **ZCOUNT key min max**

    Count the members in a sorted set with scores within the given values. [Read more >>](https://redis.io/commands/zcount)
    """
    _zcount(key: String!, min: String!, max: String!): Int
  }
`;
