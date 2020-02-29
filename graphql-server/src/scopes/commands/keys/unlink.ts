import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";

export type UnlinkArg = {
  keys: string[];
};

export const _unlink: ResolverFunction<UnlinkArg> = async (
  root,
  { keys },
  ctx
): Promise<IntResp> => {
  const reply = await redisClient.unlink(...keys);
  return reply;
};

export const typeDefs = gql`
  extend type Mutation {
    """
    **UNLINK key [key ...]**

    Delete a key asynchronously in another thread.
    Otherwise it is just as DEL, but non blocking.
    [Read more >>](https://redis.io/commands/unlink)
    """
    _unlink(keys: [String!]!): Int
  }
`;
