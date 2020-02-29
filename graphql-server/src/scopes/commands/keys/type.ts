import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";

export enum KeyType {
  string = "string",
  list = "list",
  set = "set",
  zset = "zset",
  hash = "hash",
  stream = "stream"
}

export type TypeArg = {
  key: string;
};

export const _type: ResolverFunction<TypeArg> = async (
  root,
  { key },
  ctx
): Promise<KeyType> => {
  try {
    const reply = await redisClient.type(key);
    return reply as KeyType;
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  enum KeyType {
    string
    list
    set
    zset
    hash
    stream
  }

  extend type Query {
    """
    Determine the type stored at key. [Read more >>](https://redis.io/commands/type)
    """
    _type(key: String!): KeyType
  }
`;
