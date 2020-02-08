import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";

export type SRemArg = {
  key: string;
  members: string[];
};

export const _srem: ResolverFunction<SRemArg> = async (
  root,
  { key, members },
  ctx
): Promise<IntResp> => {
  try {
    const reply = await redisClient.srem(key, ...members);
    return reply;
  } catch (err) {
    return err.message;
  }
};

export const typeDefs = gql`
  extend type Mutation {
    """
    Remove one or more members from a set. [Read more >>](https://redis.io/commands/srem)
    """
    _srem(key: String!, members: [String]): Int
  }
`;
