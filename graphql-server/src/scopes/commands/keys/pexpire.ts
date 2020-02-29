import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";

export type PExpireArg = {
  key: string;
  milliseconds: number;
};

export const _pexpire: ResolverFunction<PExpireArg> = async (
  root,
  { key, milliseconds },
  ctx
): Promise<IntResp> => {
  try {
    const reply = await redisClient.pexpire(key, milliseconds);
    return reply;
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  extend type Mutation {
    """
    Set a key's time to live in milliseconds. [Read more >>](https://redis.io/commands/pexpire)
    """
    _pexpire(key: String!, milliseconds: Int!): Int
  }
`;
