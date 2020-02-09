import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";

export type BRPopArgs = {
  keys: string[];
  timeout: number;
};

export const _brpop: ResolverFunction<BRPopArgs> = async (
  root,
  { keys, timeout },
  ctx
): Promise<string[]> => {
  try {
    const args = [...keys, timeout];
    const reply = await redisClient.send_command("brpop", ...args);
    return reply;
  } catch (err) {
    return err.message;
  }
};

export const typeDefs = gql`
  extend type Mutation {
    """
    **BRPOP key [key ...] timeout**

    Remove and get the last element in a list, or block until one is available
    [Read more >>](https://redis.io/commands/blpop)
    """
    _brpop(keys: [String!]!, timeout: Int!): [String]
  }
`;
