import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";

export type SCardArg = {
  key: string;
};

export const _scard: ResolverFunction<SCardArg> = async (
  root,
  { key },
  ctx
): Promise<IntResp> => {
  try {
    const reply = await redisClient.scard(key);
    return reply;
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  extend type Query {
    """
    Get the number of members in a set. [Read more >>](https://redis.io/commands/scard)
    """
    _scard(key: String!): Int
  }
`;
