import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";

export type PFAddArgs = {
  key: string;
  elements: string[];
};

export const _pfadd: ResolverFunction<PFAddArgs> = async (
  root,
  { key, elements },
  ctx
): Promise<IntResp> => {
  try {
    const reply = await redisClient.pfadd(key, ...elements);
    return reply;
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  extend type Mutation {
    """
    Adds the specified elements to the specified HyperLogLog. [Read more >>](https://redis.io/commands/pfadd)
    """
    _pfadd(key: String!, elements: [String!]!): Int
  }
`;
