import gql from "graphql-tag";
import { ResolverFunction } from "@typings";
import { redisClient } from "@adapters/redis";
import { parseJSONOrKeep, toMixedJSON, mapToDeepJSON } from "@utils/json";

export type HMGetArg = {
  key: string;
};

export const _hgetall: ResolverFunction<HMGetArg> = async (
  root,
  { key },
  ctx
): Promise<any> => {
  try {
    const reply = await redisClient.hgetall(key);
    const result = mapToDeepJSON(reply);

    return result;
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  extend type Query {
    """
    **HGETALL key**

    Get all the fields and values in a hash.
    [Read more >>](https://redis.io/commands/hgetall)
    """
    _hgetall(key: String!): JSON
  }
`;
