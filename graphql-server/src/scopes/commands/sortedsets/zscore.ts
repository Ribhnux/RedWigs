import gql from "graphql-tag";
import { ResolverFunction } from "@typings";
import { redisClient } from "@adapters/redis";

export type ZScoreArgs = {
  key: string;
  member: string;
};

export const _zscore: ResolverFunction<ZScoreArgs> = async (
  root,
  { key, member },
  ctx
): Promise<string> => {
  try {
    const reply = await redisClient.zscore(key, member);

    return reply;
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  extend type Query {
    """
    **ZSCORE key member**

    Get the score associated with the given member in a sorted set. [Read more >>](https://redis.io/commands/zscore)
    """
    _zscore(key: String!, member: String!): Float
  }
`;
