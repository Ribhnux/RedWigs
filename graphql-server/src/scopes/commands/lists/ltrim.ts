import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";

export type LTrimArgs = {
  key: string;
  start: number;
  stop: number;
};

export const _ltrim: ResolverFunction<LTrimArgs> = async (
  root,
  { key, start, stop },
  ctx
): Promise<String> => {
  try {
    const reply = await redisClient.ltrim(key, start, stop);
    return reply;
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  extend type Mutation {
    """
    **LTRIM key start stop**

    Trim a list to the specified range.
    [Read more >>](https://redis.io/commands/ltrim)
    """
    _ltrim(key: String!, start: Int!, stop: Int!): String
  }
`;
