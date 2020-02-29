import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";

export type TTLArg = {
  key: string;
};

export const _ttl: ResolverFunction<TTLArg> = async (
  root,
  { key },
  ctx
): Promise<IntResp> => {
  try {
    const reply = await redisClient.ttl(key);
    return reply;
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  extend type Query {
    """
    Get the time to live for a key. [Read more >>](https://redis.io/commands/ttl)
    """
    _ttl(key: String!): Int
  }
`;
