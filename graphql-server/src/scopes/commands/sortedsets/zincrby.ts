import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";

export type ZIncrByArgs = {
  key: string;
  increment: number;
  member: string;
};

export const _zincrby: ResolverFunction<ZIncrByArgs> = async (
  root,
  { key, increment, member },
  ctx
): Promise<string | number> => {
  try {
    const reply = await redisClient.zincrby(key, increment, member);
    return reply;
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  extend type Mutation {
    """
    **ZINCRBY key increment member**

    Increment the score of a member in a sorted set.
    [Read more >>](https://redis.io/commands/zincrby)
    """
    _zincrby(key: String!, increment: Float!, member: String!): String
  }
`;
