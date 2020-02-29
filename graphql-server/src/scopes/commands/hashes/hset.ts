import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";
import { convertToJSONOrKeep } from "@utils/json";

export type HSetArg = {
  key: string;
  data: any[];
};

export const _hset: ResolverFunction<HSetArg> = async (
  root,
  { key, data },
  ctx
): Promise<IntResp> => {
  try {
    const args = Object.keys(data)
      .map(key => [key, convertToJSONOrKeep(data[key])])
      .flat();
    const reply = await redisClient.send_command("hset", key, ...args);
    return reply;
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  extend type Mutation {
    """
    Set the string value of a hash field. [Read more >>](https://redis.io/commands/hset)
    """
    _hset(key: String!, data: JSON!): Int
  }
`;
