import gql from "graphql-tag";
import { ResolverFunction } from "@typings";
import { redisClient } from "@adapters/redis";

export type StrlenArg = {
  key: string;
};

export const _strlen: ResolverFunction<StrlenArg> = async (
  root,
  { key },
  ctx
): Promise<number> => {
  const value = await redisClient.strlen(key);
  return value;
};

export const typeDefs = gql`
  extend type Query {
    """
    Get the length of the value stored in a key. [See more >>](https://redis.io/commands/strlen)
    """
    _strlen(key: String!): Int
  }
`;
