import gql from "graphql-tag";
import { ResolverFunction } from "@typings";
import { redisClient } from "@adapters/redis";

export type RPopArgs = {
  key: string;
};

export const _rpop: ResolverFunction<RPopArgs> = async (
  root,
  { key },
  ctx
): Promise<string> => {
  try {
    const reply = await redisClient.rpop(key);
    return reply;
  } catch (err) {
    return err.message;
  }
};

export const typeDefs = gql`
  extend type Mutation {
    """
    Remove and get the last element in a list. [Read more >>](https://redis.io/commands/rpop)
    """
    _rpop(key: String!): String
  }
`;