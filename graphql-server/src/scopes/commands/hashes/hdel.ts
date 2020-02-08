import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";
import { convertToJSONOrKeep } from "@utils/json";

export type HDelArgs = {
  key: string;
  fields: string[];
};

export const _hdel: ResolverFunction<HDelArgs> = async (
  root,
  { key, fields },
  ctx
): Promise<IntResp> => {
  try {
    const reply = await redisClient.hdel(key, ...fields);
    return reply;
  } catch (err) {
    return err.message;
  }
};

export const typeDefs = gql`
  extend type Mutation {
    """
    Delete one or more hash fields. [Read more >>](https://redis.io/commands/hdel)
    """
    _hdel(key: String!, fields: [String!]!): Int
  }
`;
