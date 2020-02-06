import { gql } from "apollo-server";
import { ResolverFunction, IntResp, ErrResp } from "@typings";
import { redisClient } from "@adapters/redis";

export type GetRangeArg = {
  key: string;
  start: number;
  end: number;
};

export const _getrange: ResolverFunction<GetRangeArg> = async (
  root,
  { key, start, end },
  ctx
): Promise<string | null> => {
  try {
    const reply = await redisClient.getrange(key, start, end);
    return reply;
  } catch (err) {
    return err.message;
  }
};

export const typeDefs = gql`
  extend type Query {
    """
    Get a substring of the string stored at a key. [See more >>](https://redis.io/commands/getrange)
    """
    _getrange(key: String!, start: Int!, end: Int!): RespBulk
  }
`;
