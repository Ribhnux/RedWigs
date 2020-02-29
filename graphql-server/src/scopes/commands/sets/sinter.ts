import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";

export type SInterArg = {
  keys: [string];
};

export const _sinter: ResolverFunction<SInterArg> = async (
  root,
  { keys },
  ctx
): Promise<string[]> => {
  try {
    const reply = await redisClient.sinter(...keys);
    return reply;
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  extend type Query {
    """
    Intersect multiple sets. [Read more >>](https://redis.io/commands/sinter)
    """
    _sinter(keys: [String]!): [String]
  }
`;
