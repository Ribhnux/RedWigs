import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";
import { convertToJSONOrKeep } from "@utils/json";

export type HSetNXArg = {
  key: string;
  field: string;
  value: any;
};

export const _hsetnx: ResolverFunction<HSetNXArg> = async (
  root,
  { key, field, value },
  ctx
): Promise<IntResp> => {
  try {
    const _value = convertToJSONOrKeep(value);
    const reply = await redisClient.hsetnx(key, field, _value);
    return reply;
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  extend type Mutation {
    """
    **HSETNX key field value**

    Set the value of a hash field, only if the field does not exist.
    [Read more >>](https://redis.io/commands/hsetnx)
    """
    _hsetnx(key: String!, field: String!, value: JSON!): Int
  }
`;
