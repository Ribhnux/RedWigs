import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";

export type SAddArg = {
  key: string;
  members: string[];
};

export const _sadd: ResolverFunction<SAddArg> = async (
  root,
  { key, members },
  ctx
): Promise<IntResp> => {
  try {
    const reply = await redisClient.sadd(key, ...members);
    return reply;
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  extend type Mutation {
    """
    **SADD key member [member ...]**

    Add one or more members to a set.
    [Read more >>](https://redis.io/commands/sadd)
    """
    _sadd(key: String!, members: [String!]!): Int
  }
`;
