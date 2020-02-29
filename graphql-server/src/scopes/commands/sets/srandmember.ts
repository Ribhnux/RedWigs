import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";

export type SRandMemberArg = {
  key: string;
  count?: number;
};

export const _srandmember: ResolverFunction<SRandMemberArg> = async (
  root,
  { key, count },
  ctx
): Promise<string | string[]> => {
  try {
    const reply = count
      ? await redisClient.srandmember(key, count)
      : await redisClient.srandmember(key);
    return reply;
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  extend type Query {
    """
    **SRANDMEMBER key [count]**

    Get one or multiple random members from a set.
    [Read more >>](https://redis.io/commands/srandmember)
    """
    _srandmember(key: String!, count: Int): JSON
  }
`;
