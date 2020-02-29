import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";

export type EvalSHAArgs = {
  sha1: string;
  numkeys: number;
  keys: string[];
  args: string[];
};

export const _evalsha: ResolverFunction<EvalSHAArgs> = async (
  root,
  { sha1, numkeys, keys, args },
  ctx
): Promise<any> => {
  const result = await redisClient.evalsha(sha1, numkeys, ...keys, ...args);

  return result;
};

export const typeDefs = gql`
  extend type Query {
    """
    **EVALSHA sha1 numkeys key [key ...] arg [arg ...]**

    Execute a Lua script server side. [Read more >>](https://redis.io/commands/evalsha)
    """
    _evalsha(
      sha1: String!
      numkeys: Int!
      keys: [String!]!
      args: [String!]!
    ): JSON
  }
`;
