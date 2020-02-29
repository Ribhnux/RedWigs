import gql from "graphql-tag";
import { ResolverFunction } from "@typings";
import { redisClient } from "@adapters/redis";

export type BRPopLPushArgs = {
  source: string;
  destination: string;
  timeout: number;
};

export const _brpoplpush: ResolverFunction<BRPopLPushArgs> = async (
  root,
  { source, destination, timeout },
  ctx
): Promise<string> => {
  try {
    const reply = await redisClient.send_command(
      "brpoplpush",
      source,
      destination,
      timeout
    );
    return reply;
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  extend type Mutation {
    """
    **BRPOPLPUSH source destination timeout**

    Pop an element from a list, push it to another list and return it;
    or block until one is available.
    [Read more >>](https://redis.io/commands/brpoplpush)
    """
    _brpoplpush(source: String!, destination: String!, timeout: Int!): String
  }
`;
