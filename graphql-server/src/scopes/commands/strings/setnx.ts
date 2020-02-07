import { gql } from "apollo-server";
import { ResolverFunction, IntResp, ErrResp } from "@typings";
import { redisClient } from "@adapters/redis";

export type SetNXArg = {
  key: string;
  value: string;
};

export const _setnx: ResolverFunction<SetNXArg> = async (
  root,
  { key, value },
  ctx
): Promise<IntResp | ErrResp> => {
  try {
    const reply = await redisClient.setnx(key, value);
    return reply;
  } catch (err) {
    return err.message;
  }
};

export const typeDefs = gql`
  extend type Mutation {
    """
    Set the value of a key, only if the key does not exist. [Read more >>](https://redis.io/commands/setnx)
    """
    _setnx(key: String!, value: String!): Int
  }
`;
