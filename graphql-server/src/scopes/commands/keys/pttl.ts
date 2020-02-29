import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";

export type PTTLArg = {
  key: string;
};

export const _pttl: ResolverFunction<PTTLArg> = async (
  root,
  { key },
  ctx
): Promise<IntResp> => {
  try {
    const reply = await redisClient.pttl(key);
    return reply;
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  extend type Query {
    """
    Get the time to live for a key in milliseconds. [Read more >>](https://redis.io/commands/pttl)
    """
    _pttl(key: String!): Int
  }
`;
