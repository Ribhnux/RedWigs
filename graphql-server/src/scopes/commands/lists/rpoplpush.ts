import gql from "graphql-tag";
import { ResolverFunction } from "@typings";
import { redisClient } from "@adapters/redis";

export type RPopLPushArgs = {
  source: string;
  destination: string;
};

export const _rpoplpush: ResolverFunction<RPopLPushArgs> = async (
  root,
  { source, destination },
  ctx
): Promise<string> => {
  try {
    const reply = await redisClient.rpoplpush(source, destination);
    return reply;
  } catch (err) {
    return err.message;
  }
};

export const typeDefs = gql`
  extend type Mutation {
    """
    **RPOPLPUSH source destination**

    Remove the last element in a list, prepend it to another list and return it.
    [Read more >>](https://redis.io/commands/rpoplpush)
    """
    _rpoplpush(source: String!, destination: String!): String
  }
`;
