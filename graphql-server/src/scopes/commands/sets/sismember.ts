import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";

export type SIsMemberArg = {
  key: string;
  member: string;
};

export const _sismember: ResolverFunction<SIsMemberArg> = async (
  root,
  { key, member },
  ctx
): Promise<IntResp> => {
  try {
    const reply = await redisClient.sismember(key, member);
    return reply;
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  extend type Query {
    """
    **SISMEMBER key member**

    Determine if a given value is a member of a set.
    [Read more >>](https://redis.io/commands/sismember)
    """
    _sismember(key: String!, member: String!): Int
  }
`;
