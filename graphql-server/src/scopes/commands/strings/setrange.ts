import { gql } from "apollo-server";
import { ResolverFunction, IntResp, ErrResp } from "@typings";
import { redisClient } from "@adapters/redis";

export type SetRangeArg = {
  key: string;
  offset: number;
  value: string;
};

export const _setrange: ResolverFunction<SetRangeArg> = async (
  root,
  { key, offset, value },
  ctx
): Promise<IntResp | ErrResp> => {
  try {
    const reply = await redisClient.setrange(key, offset, value);
    return reply;
  } catch (err) {
    return err.message;
  }
};

export const typeDefs = gql`
  extend type Mutation {
    """
    Overwrite part of a string at key starting at the specified offset. [See more >>](https://redis.io/commands/setrange)
    """
    _setrange(key: String!, offset: Int!, value: String!): Int
  }
`;