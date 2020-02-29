import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";

export type SMoveArg = {
  source: string;
  destination: string;
  member: string;
};

export const _smove: ResolverFunction<SMoveArg> = async (
  root,
  { source, destination, member },
  ctx
): Promise<IntResp> => {
  try {
    const reply = await redisClient.smove(source, destination, member);
    return parseInt(reply, 10);
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  extend type Mutation {
    """
    Move a member from one set to another. [Read more >>](https://redis.io/commands/smove)
    """
    _smove(source: String!, destination: String!, member: String!): Int
  }
`;
