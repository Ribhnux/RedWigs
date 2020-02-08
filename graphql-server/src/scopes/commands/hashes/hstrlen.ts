import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";

export type HStrlenArg = {
  key: string;
  field: string;
};

export const _hstrlen: ResolverFunction<HStrlenArg> = async (
  root,
  { key, field },
  ctx
): Promise<IntResp> => {
  try {
    const reply = await redisClient.send_command("hstrlen", key, field);
    return reply;
  } catch (err) {
    return err.message;
  }
};

export const typeDefs = gql`
  extend type Query {
    """
    Get the length of the value of a hash field. [Read more >>](https://redis.io/commands/hstrlen)
    """
    _hstrlen(key: String!, field: String!): Int
  }
`;
