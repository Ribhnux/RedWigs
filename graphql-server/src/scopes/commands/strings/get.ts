import gql from "graphql-tag";
import { ResolverFunction } from "@typings";
import { redisClient } from "@adapters/redis";

export type GetArg = {
  key: string;
};

export const _get: ResolverFunction<GetArg> = async (
  root,
  { key },
  ctx
): Promise<string> => {
  const value = await redisClient.get(key);
  return value;
};

export const typeDefs = gql`
  extend type Query {
    """
    Get the value of key. [See more >>](https://redis.io/commands/get)
    """
    _get(key: String!): String
  }
`;
