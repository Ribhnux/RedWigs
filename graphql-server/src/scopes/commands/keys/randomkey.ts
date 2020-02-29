import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";

export type RandomKeyArg = {
  pattern: string;
};

export const _randomkey: ResolverFunction<any> = async (
  root,
  { pattern },
  ctx
): Promise<string> => {
  try {
    const reply = await redisClient.randomkey();
    return reply;
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  extend type Query {
    """
    Return a random key from the keyspace. [Read more >>](https://redis.io/commands/randomkey)
    """
    _randomkey: String
  }
`;
