import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";

export type SDiffArg = {
  keys: [string];
};

export const _sdiff: ResolverFunction<SDiffArg> = async (
  root,
  { keys },
  ctx
): Promise<string[]> => {
  try {
    const reply = await redisClient.sdiff(...keys);
    return reply;
  } catch (err) {
    return err.message;
  }
};

export const typeDefs = gql`
  extend type Query {
    """
    Subtract multiple sets. [Read more >>](https://redis.io/commands/sdiff)
    """
    _sdiff(keys: [String]!): [String]
  }
`;