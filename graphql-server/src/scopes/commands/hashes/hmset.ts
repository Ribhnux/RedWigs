import gql from "graphql-tag";
import { ResolverFunction } from "@typings";
import { redisClient } from "@adapters/redis";
import { convertToJSONOrKeep } from "@utils/json";

export type HMSetArg = {
  key: string;
  data: any[];
};

export const _hmset: ResolverFunction<HMSetArg> = async (
  root,
  { key, data },
  ctx
): Promise<any> => {
  try {
    const _data = Object.keys(data)
      .map(key => [key, convertToJSONOrKeep(data[key])])
      .flat();
    const reply = await redisClient.hmset(key, _data);
    return reply;
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  extend type Mutation {
    """
    Get the length of the value of a hash field. [Read more >>](https://redis.io/commands/hmset)
    """
    _hmset(key: String!, data: JSON!): String
      @deprecated(
        reason: "HMSET is deprecated as Redis 4.0. Use _hset instead!."
      )
  }
`;
