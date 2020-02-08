import gql from "graphql-tag";
import { ResolverFunction } from "@typings";
import { redisClient } from "@adapters/redis";
import { parseJSONOrKeep } from "@utils/json";

export type HValsArg = {
  key: string;
};

export const _hvals: ResolverFunction<HValsArg> = async (
  root,
  { key },
  ctx
): Promise<any[]> => {
  try {
    const reply: string[] = await redisClient.hvals(key);
    const result = reply.map(v => parseJSONOrKeep(v));
    return result;
  } catch (err) {
    return err.message;
  }
};

export const typeDefs = gql`
  extend type Query {
    """
    Get all the values in a hash. [Read more >>](https://redis.io/commands/hvals)
    """
    _hvals(key: String!): [JSON]
  }
`;
