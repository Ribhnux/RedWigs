import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";

export type ExistsArg = {
  keys: string[];
};

export const _exists: ResolverFunction<ExistsArg> = async (
  root,
  { keys },
  ctx
): Promise<IntResp> => {
  const existNumber = await redisClient.exists(...keys);
  return existNumber;
};

export const typeDefs = gql`
  extend type Query {
    """
    **EXISTS key [key ...]**

    Determine if a key exists. [Read more >>](https://redis.io/commands/exists)
    """
    _exists(keys: [String!]!): Int
  }
`;
