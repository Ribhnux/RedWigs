import gql from "graphql-tag";
import { ResolverFunction } from "@typings";
import { redisClient } from "@adapters/redis";

export type GetSetArg = {
  key: string;
  value: string;
};

export const _getset: ResolverFunction<GetSetArg> = async (
  root,
  { key, value },
  ctx
): Promise<string> => {
  const resp = await redisClient.getset(key, value);
  return resp;
};

export const typeDefs = gql`
  extend type Mutation {
    """
    Set the string value of a key and return its old value. [See more >>](https://redis.io/commands/getset)
    """
    _getset(key: String!, value: String!): RespBulk
  }
`;
