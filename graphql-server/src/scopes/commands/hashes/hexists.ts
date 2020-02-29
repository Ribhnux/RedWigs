import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";

export type HExistsArg = {
  key: string;
  field: string;
};

export const _hexists: ResolverFunction<HExistsArg> = async (
  root,
  { key, field },
  ctx
): Promise<IntResp> => {
  try {
    const reply = await redisClient.hexists(key, field);
    return reply;
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  extend type Query {
    """
    Determine if a hash field exists. [Read more >>](https://redis.io/commands/hexists)
    """
    _hexists(key: String!, field: String!): Int
  }
`;
