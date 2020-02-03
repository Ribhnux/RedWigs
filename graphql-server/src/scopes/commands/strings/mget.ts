import gql from "graphql-tag";
import { ResolverFunction, KeyValue } from "@typings";
import { redisClient } from "@adapters/redis";
import _ from "lodash";

const arrayTuppleToKeyValues = ([key, value]: [string, string]) => ({
  key,
  value
});

export type MGetArgs = {
  keys: string[];
};

export const _mget: ResolverFunction<MGetArgs> = async (
  root,
  { keys },
  ctx
): Promise<any> => {
  try {
    const values: string[] = await redisClient.mget.apply(redisClient, keys);
    const keyvalues: any = _.zipObject(keys, values);

    return keyvalues;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const schema = gql`
  extend type Query {
    """
    Get the values of all the given keys. [See more >>](https://redis.io/commands/mget)
    """
    _mget(keys: [String!]!): JSON
  }
`;
