import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";

export type TouchArg = {
  keys: string[];
};

export const _touch: ResolverFunction<TouchArg> = async (
  root,
  { keys },
  ctx
): Promise<IntResp> => {
  try {
    const reply = await redisClient.send_command("touch", ...keys);
    return reply;
  } catch (err) {
    return err.message;
  }
};

export const typeDefs = gql`
  extend type Mutation {
    """
    Alters the last access time of a key(s). Returns the number of existing keys specified..
    [Read more >>](https://redis.io/commands/touch)
    """
    _touch(keys: [String!]!): Int
  }
`;
