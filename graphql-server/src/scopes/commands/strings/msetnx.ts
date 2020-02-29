import { gql } from "apollo-server";
import { ResolverFunction, IntResp, ErrResp } from "@typings";
import { redisClient } from "@adapters/redis";

export type MSetNXArg = {
  data: any[];
};

export const _msetnx: ResolverFunction<MSetNXArg> = async (
  root,
  { data },
  ctx
): Promise<IntResp | ErrResp> => {
  try {
    const reply = await redisClient.msetnx(data);
    return reply;
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  extend type Mutation {
    """
    **MSETNX key value [key value ...]**

    Set multiple keys to multiple values, only if none of the keys exist.
    [Read more >>](https://redis.io/commands/msetnx)
    """
    _msetnx(data: JSON!): Int
  }
`;
