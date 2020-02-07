import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";

export type AppendArg = {
  key: string;
  value: string;
};

export const _append: ResolverFunction<AppendArg> = async (
  root,
  { key, value },
  ctx
): Promise<IntResp> => {
  const reply = await redisClient.append(key, value);
  return reply;
};

export const typeDefs = gql`
  extend type Mutation {
    """
    Append a value to a key. [Read more >>](https://redis.io/commands/append)
    """
    _append(key: String!, value: String!): Int
  }
`;
