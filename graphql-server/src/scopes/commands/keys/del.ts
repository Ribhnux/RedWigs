import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";

export type DelArg = {
  keys: string[];
};

export const _del: ResolverFunction<DelArg> = async (
  root,
  { keys },
  ctx
): Promise<IntResp> => {
  const existNumber = await redisClient.del(...keys);
  return existNumber;
};

export const typeDefs = gql`
  extend type Mutation {
    """
    **DEL key [key ...]**

    Delete a key. [Read more >>](https://redis.io/commands/del)
    """
    _del(keys: [String!]!): Int
  }
`;
