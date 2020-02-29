import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";

export type RenameArg = {
  key: string;
  newkey: string;
};

export const _rename: ResolverFunction<RenameArg> = async (
  root,
  { key, newkey },
  ctx
): Promise<string> => {
  try {
    const reply = await redisClient.rename(key, newkey);
    return reply;
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  extend type Mutation {
    """
    Rename a key. [Read more >>](https://redis.io/commands/rename)
    """
    _rename(key: String!, newkey: String!): String
  }
`;
