import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";

export type SUnionStoreArg = {
  destination: string;
  keys: string[];
};

export const _sunionstore: ResolverFunction<SUnionStoreArg> = async (
  root,
  { destination, keys },
  ctx
): Promise<IntResp> => {
  try {
    const reply = await redisClient.sunionstore(destination, ...keys);
    return reply;
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  extend type Mutation {
    """
    Add multiple sets and store the resulting set in a key. [Read more >>](https://redis.io/commands/sunionstore)
    """
    _sunionstore(destination: String, keys: [String!]!): Int
  }
`;
