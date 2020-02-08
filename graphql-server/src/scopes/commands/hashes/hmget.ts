import gql from "graphql-tag";
import { ResolverFunction } from "@typings";
import { redisClient } from "@adapters/redis";
import { parseJSONOrKeep } from "@utils/json";
import _ from "lodash";

export type HMGetArg = {
  key: string;
  fields: string[];
};

export const _hmget: ResolverFunction<HMGetArg> = async (
  root,
  { key, fields },
  ctx
): Promise<any> => {
  try {
    const reply: any[] = await redisClient.hmget(key, ...fields);
    const result = _.zipObject(
      fields,
      reply.map(v => parseJSONOrKeep(v))
    );
    return result;
  } catch (err) {
    return err.message;
  }
};

export const typeDefs = gql`
  extend type Query {
    """
    Get the values of all the given hash fields. [Read more >>](https://redis.io/commands/hmget)
    """
    _hmget(key: String!, fields: [String!]!): JSON
  }
`;
