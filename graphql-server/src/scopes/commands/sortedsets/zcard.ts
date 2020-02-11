import gql from "graphql-tag";
import { ResolverFunction } from "@typings";
import { redisClient } from "@adapters/redis";

export type ZCardArgs = {
  key: string;
};

export const _zcard: ResolverFunction<ZCardArgs> = async (
  root,
  { key },
  ctx
): Promise<number> => {
  try {
    const reply = await redisClient.zcard(key);

    return reply;
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  extend type Query {
    """
    **ZCARD key**

    Get the number of members in a sorted set. [Read more >>](https://redis.io/commands/zcard)
    """
    _zcard(key: String!): Int
  }
`;
