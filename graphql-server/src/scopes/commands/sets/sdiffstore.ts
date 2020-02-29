import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";

export type SDiffStoreArg = {
  destination: string;
  keys: [string];
};

export const _sdiffstore: ResolverFunction<SDiffStoreArg> = async (
  root,
  { destination, keys },
  ctx
): Promise<IntResp> => {
  try {
    const reply = await redisClient.sdiffstore(destination, ...keys);
    return reply;
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  extend type Mutation {
    """
    Subtract multiple sets and store the resulting set in a key. [Read more >>](https://redis.io/commands/sdiffstore)
    """
    _sdiffstore(destination: String!, keys: [String]!): Int
  }
`;
