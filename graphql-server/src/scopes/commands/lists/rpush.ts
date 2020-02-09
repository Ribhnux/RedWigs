import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";

export type RPushArgs = {
  key: string;
  elements: string[];
};

export const _rpush: ResolverFunction<RPushArgs> = async (
  root,
  { key, elements },
  ctx
): Promise<IntResp> => {
  try {
    const reply = await redisClient.rpush(key, ...elements);
    return reply;
  } catch (err) {
    return err.message;
  }
};

export const typeDefs = gql`
  extend type Mutation {
    """
    Append one or multiple elements to a list. [Read more >>](https://redis.io/commands/rpush)
    """
    _rpush(key: String!, elements: [String!]!): Int
  }
`;
