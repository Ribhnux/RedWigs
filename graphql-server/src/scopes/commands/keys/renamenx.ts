import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";

export type RenameNXArg = {
  key: string;
  newkey: string;
};

export const _renamenx: ResolverFunction<RenameNXArg> = async (
  root,
  { key, newkey },
  ctx
): Promise<IntResp> => {
  try {
    const reply = await redisClient.renamenx(key, newkey);
    return reply;
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  extend type Mutation {
    """
    **RENAMENX key newkey**

    Rename a key, only if the new key does not exist.
    [Read more >>](https://redis.io/commands/renamenx)
    """
    _renamenx(key: String!, newkey: String!): Int
  }
`;
