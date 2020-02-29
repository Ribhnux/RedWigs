import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";

export type LPopArgs = {
  key: string;
};

export const _lpop: ResolverFunction<LPopArgs> = async (
  root,
  { key },
  ctx
): Promise<string> => {
  try {
    const reply = await redisClient.lpop(key);
    return reply;
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  extend type Mutation {
    """
    Remove and get the first element in a list. [Read more >>](https://redis.io/commands/lpop)
    """
    _lpop(key: String!): String
  }
`;
