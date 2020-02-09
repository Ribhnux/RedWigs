import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";

export type LPushArgs = {
  key: string;
  elements: string[];
};

export const _lpush: ResolverFunction<LPushArgs> = async (
  root,
  { key, elements },
  ctx
): Promise<IntResp> => {
  try {
    const reply = await redisClient.lpush(key, ...elements);
    return reply;
  } catch (err) {
    return err.message;
  }
};

export const typeDefs = gql`
  extend type Mutation {
    """
    Prepend one or multiple elements to a list. [Read more >>](https://redis.io/commands/lpush)
    """
    _lpush(key: String!, elements: [String!]!): Int
  }
`;
