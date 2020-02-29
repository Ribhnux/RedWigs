import { gql } from "apollo-server";
import { ResolverFunction, IntResp, ErrResp } from "@typings";
import { redisClient } from "@adapters/redis";

export type SetExArgs = {
  key: string;
  seconds: number;
  value: string;
};

export const _setex: ResolverFunction<SetExArgs> = async (
  root,
  { key, seconds, value },
  ctx
): Promise<string> => {
  try {
    const reply = await redisClient.setex(key, seconds, value);
    return reply;
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  extend type Mutation {
    """
    Set the value and expiration of a key. [Read more >>](https://redis.io/commands/setex)
    """
    _setex(key: String!, seconds: Int!, value: String!): String
  }
`;
