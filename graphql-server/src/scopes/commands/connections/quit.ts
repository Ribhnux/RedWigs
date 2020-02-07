import gql from "graphql-tag";
import { ResolverFunction } from "@typings";
import { redisClient } from "@adapters/redis";

export type PingArg = {
  message?: string;
};

export const _quit: ResolverFunction<any> = async (
  root,
  args,
  ctx
): Promise<string> => {
  try {
    const value = await redisClient.quit();
    return value;
  } catch (err) {
    return err.message;
  }
};

export const typeDefs = gql`
  extend type Mutation {
    """
    Close the connection. [Read more >>](https://redis.io/commands/quit)
    """
    _quit: String
  }
`;
