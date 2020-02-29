import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";

export type LPushXArgs = {
  key: string;
  elements: string[];
};

export const _lpushx: ResolverFunction<LPushXArgs> = async (
  root,
  { key, elements },
  ctx
): Promise<IntResp> => {
  try {
    const args = [key, ...elements];
    const reply = await redisClient.send_command("lpushx", ...args);
    return reply;
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  extend type Mutation {
    """
    **LPUSHX key element [element ...]**

    Prepend an element to a list, only if the list exists.
    [Read more >>](https://redis.io/commands/lpushx)
    """
    _lpushx(key: String!, elements: [String!]!): Int
  }
`;
