import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";

export type ZRemArgs = {
  key: string;
  members: string[];
};

export const _zrem: ResolverFunction<ZRemArgs> = async (
  root,
  { key, members },
  ctx
): Promise<string | number> => {
  try {
    const reply = await redisClient.zrem(key, ...members);
    return reply;
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  extend type Mutation {
    """
    **ZREM key member [member ...]**

    Remove one or more members from a sorted set.
    [Read more >>](https://redis.io/commands/zrem)
    """
    _zrem(key: String!, members: [String!]!): JSON
  }
`;
