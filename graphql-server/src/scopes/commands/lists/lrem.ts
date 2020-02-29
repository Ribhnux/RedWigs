import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";

export type LRemArgs = {
  key: string;
  count: number;
  element: any;
};

export const _lrem: ResolverFunction<LRemArgs> = async (
  root,
  { key, count, element },
  ctx
): Promise<IntResp> => {
  try {
    const reply = await redisClient.lrem(key, count, element);
    return reply;
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  extend type Mutation {
    """
    **LREM key count element**

    Remove elements from a list. [Read more >>](https://redis.io/commands/lrem)
    """
    _lrem(key: String!, count: Int!, element: String!): Int
  }
`;
