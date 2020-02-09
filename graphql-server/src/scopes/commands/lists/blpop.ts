import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";

export type BLPopArgs = {
  keys: string[];
  timeout: number;
};

export const _blpop: ResolverFunction<BLPopArgs> = async (
  root,
  { keys, timeout },
  ctx
): Promise<string[]> => {
  try {
    const args = [...keys, timeout];
    const reply = await redisClient.send_command("blpop", ...args);
    return reply;
  } catch (err) {
    return err.message;
  }
};

export const typeDefs = gql`
  extend type Mutation {
    """
    **BLPOP key [key ...] timeout**

    Remove and get the first element in a list, or block until one is available.
    [Read more >>](https://redis.io/commands/blpop)
    """
    _blpop(keys: [String!]!, timeout: Int!): [String]
  }
`;
