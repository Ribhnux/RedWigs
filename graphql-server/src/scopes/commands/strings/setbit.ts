import { gql } from "apollo-server";
import { ResolverFunction, IntResp, ErrResp } from "@typings";
import { redisClient } from "@adapters/redis";

export type SetBitArg = {
  key: string;
  offset: number;
  value: number;
};

export const _setbit: ResolverFunction<SetBitArg> = async (
  root,
  { key, offset, value },
  ctx
): Promise<IntResp | ErrResp> => {
  try {
    const reply = await redisClient.setbit(key, offset, value);
    return reply;
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  extend type Mutation {
    """
    **SETBIT key offset value**

    Sets or clears the bit at offset in the string value stored at key.
    [Read more >>](https://redis.io/commands/setbit)
    """
    _setbit(key: String!, offset: Int!, value: Int!): Int
  }
`;
