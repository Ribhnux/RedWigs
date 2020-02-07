import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";

export type KeysArg = {
  pattern: string;
};

export const _keys: ResolverFunction<KeysArg> = async (
  root,
  { pattern },
  ctx
): Promise<string[]> => {
  try {
    const reply = await redisClient.keys(pattern);
    return reply;
  } catch (err) {
    return err.message;
  }
};

export const typeDefs = gql`
  extend type Query {
    """
    Find all keys matching the given pattern. [Read more >>](https://redis.io/commands/keys)
    """
    _keys(pattern: String!): [String]
  }
`;
