import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";

export type RPushXArgs = {
  key: string;
  elements: string[];
};

export const _rpushx: ResolverFunction<RPushXArgs> = async (
  root,
  { key, elements },
  ctx
): Promise<IntResp> => {
  try {
    const args = [key, ...elements];
    const reply = await redisClient.send_command("rpushx", ...args);
    return reply;
  } catch (err) {
    return err.message;
  }
};

export const typeDefs = gql`
  extend type Mutation {
    """
    Append an element to a list, only if the list exists. [Read more >>](https://redis.io/commands/rpushx)
    """
    _rpushx(key: String!, elements: [String!]!): Int
  }
`;
