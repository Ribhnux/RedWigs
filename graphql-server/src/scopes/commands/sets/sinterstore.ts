import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";

export type SInterStoreArg = {
  destination: string;
  keys: [string];
};

export const _sinterstore: ResolverFunction<SInterStoreArg> = async (
  root,
  { destination, keys },
  ctx
): Promise<IntResp> => {
  try {
    const reply = await redisClient.sinterstore(destination, ...keys);
    return reply;
  } catch (err) {
    return err.message;
  }
};

export const typeDefs = gql`
  extend type Mutation {
    """
    Intersect multiple sets and store the resulting set in a key. [Read more >>](https://redis.io/commands/sinterstore)
    """
    _sinterstore(destination: String!, keys: [String]!): Int
  }
`;
