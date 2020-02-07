import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";

export type PersistArg = {
  key: string;
};

export const _persist: ResolverFunction<PersistArg> = async (
  root,
  { key },
  ctx
): Promise<IntResp> => {
  try {
    const reply = await redisClient.persist(key);
    return reply;
  } catch (err) {
    return err.message;
  }
};

export const typeDefs = gql`
  extend type Mutation {
    """
    Remove the expiration from a key. [Read more >>](https://redis.io/commands/persist)
    """
    _persist(key: String!): Int
  }
`;