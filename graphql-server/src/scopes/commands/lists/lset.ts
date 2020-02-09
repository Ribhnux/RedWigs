import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";

export type LSetArgs = {
  key: string;
  index: number;
  element: any;
};

export const _lset: ResolverFunction<LSetArgs> = async (
  root,
  { key, index, element },
  ctx
): Promise<string> => {
  try {
    const reply = await redisClient.lset(key, index, element);
    return reply;
  } catch (err) {
    return err.message;
  }
};

export const typeDefs = gql`
  extend type Mutation {
    """
    Set the value of an element in a list by its index. [Read more >>](https://redis.io/commands/lset)
    """
    _lset(key: String!, index: Int!, element: String!): String
  }
`;