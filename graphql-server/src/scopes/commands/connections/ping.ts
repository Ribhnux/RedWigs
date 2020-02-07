import gql from "graphql-tag";
import { ResolverFunction } from "@typings";
import { redisClient } from "@adapters/redis";

export type PingArg = {
  message?: string;
};

export const _ping: ResolverFunction<PingArg> = async (
  root,
  { message },
  ctx
): Promise<string> => {
  try {
    const value = message
      ? await redisClient.ping(message)
      : await redisClient.ping();
    return value;
  } catch (err) {
    return err.message;
  }
};

export const typeDefs = gql`
  extend type Query {
    """
    Ping the server. [Read more >>](https://redis.io/commands/ping)
    """
    _ping(message: String): String
  }
`;
