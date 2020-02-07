import gql from "graphql-tag";
import { ResolverFunction } from "@typings";
import { redisClient } from "@adapters/redis";

export type EchoArg = {
  message: string;
};

export const _echo: ResolverFunction<EchoArg> = async (
  root,
  { message },
  ctx
): Promise<string> => {
  try {
    const value = await redisClient.echo(message);
    return value;
  } catch (err) {
    return err.message;
  }
};

export const typeDefs = gql`
  extend type Query {
    """
    Echo the given string. [Read more >>](https://redis.io/commands/echo)
    """
    _echo(message: String!): String
  }
`;
