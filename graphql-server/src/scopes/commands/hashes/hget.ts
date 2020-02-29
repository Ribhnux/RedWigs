import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";
import { parseJSONOrKeep } from "@utils/json";

export type HGetArg = {
  key: string;
  field: string;
};

export const _hget: ResolverFunction<HGetArg> = async (
  root,
  { key, field },
  ctx
): Promise<any> => {
  try {
    const reply = await redisClient.hget(key, field);
    const _reply = parseJSONOrKeep(reply);
    return _reply;
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  extend type Query {
    """
    **HGET key field**

    Get the value of a hash field.
    [Read more >>](https://redis.io/commands/hget)
    """
    _hget(key: String!, field: String!): JSON
  }
`;
