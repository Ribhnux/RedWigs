import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";

export type EvalArgs = {
  script: string;
  numkeys: number;
  keys: string[];
  args: string[];
};

export const _eval: ResolverFunction<EvalArgs> = async (
  root,
  { script, numkeys, keys, args },
  ctx
): Promise<IntResp> => {
  try {
    const finalArgs = [script, numkeys];
    if (keys) finalArgs.push(...keys);
    if (args) finalArgs.push(...args);

    const result = await redisClient.send_command("EVAL", ...finalArgs);
    return result;
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  extend type Mutation {
    """
    **EVAL script numkeys key [key ...] arg [arg ...]**

    Execute a Lua script server side. [Read more >>](https://redis.io/commands/eval)
    """
    _eval(
      script: String!
      numkeys: Int!
      keys: [String!]
      args: [String!]
    ): JSON
  }
`;
