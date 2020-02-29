import { gql } from "apollo-server";
import { ResolverFunction, IntResp, ErrResp } from "@typings";
import { redisClient } from "@adapters/redis";

export type GetBitArg = {
  key: string;
  offset: number;
};

export const _getbit: ResolverFunction<GetBitArg> = async (
  root,
  { key, offset },
  ctx
): Promise<IntResp | null> => {
  try {
    const reply = await redisClient.getbit(key, offset);
    return reply;
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  extend type Query {
    """
    **GETBIT key offset**

    Returns the bit value at offset in the string value stored at key. [Read more >>](https://redis.io/commands/getbit)
    """
    _getbit(key: String!, offset: Int!): Int
  }
`;
