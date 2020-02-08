import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";

export type SUnionArg = {
  keys: string[];
};

export const _sunion: ResolverFunction<SUnionArg> = async (
  root,
  { keys },
  ctx
): Promise<string[]> => {
  try {
    const reply = await redisClient.sunion(...keys);
    return reply;
  } catch (err) {
    return err.message;
  }
};

export const typeDefs = gql`
  extend type Query {
    """
    Add multiple sets. [Read more >>](https://redis.io/commands/sunion)
    """
    _sunion(keys: [String!]!): [String]
  }
`;
