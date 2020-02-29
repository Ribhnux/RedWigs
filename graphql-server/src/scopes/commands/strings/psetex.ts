import { gql } from "apollo-server";
import { ResolverFunction } from "@typings";
import { redisClient } from "@adapters/redis";

export type PSetExArgs = {
  key: string;
  milliseconds: number;
  value: string;
};

export const _psetex: ResolverFunction<PSetExArgs> = async (
  root,
  { key, milliseconds, value },
  ctx
): Promise<string> => {
  try {
    const reply = await redisClient.psetex(key, milliseconds, value);
    return reply;
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  extend type Mutation {
    """
    **PSETEX key milliseconds value**

    Set the value and expiration in milliseconds of a key.
    [Read more >>](https://redis.io/commands/psetex)
    """
    _psetex(key: String!, milliseconds: Int!, value: String!): String
  }
`;
