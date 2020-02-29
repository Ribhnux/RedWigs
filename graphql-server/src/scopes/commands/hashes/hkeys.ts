import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";

export type HKeysArg = {
  key: string;
};

export const _hkeys: ResolverFunction<HKeysArg> = async (
  root,
  { key },
  ctx
): Promise<string[]> => {
  try {
    const reply = await redisClient.hkeys(key);
    return reply;
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  extend type Query {
    """
    Get all the fields in a hash. [Read more >>](https://redis.io/commands/hkeys)
    """
    _hkeys(key: String!): [String]
  }
`;
