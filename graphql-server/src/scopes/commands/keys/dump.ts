import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";
import jsesc from "jsesc";

export type DelArg = {
  key: string;
};

export const _dump: ResolverFunction<DelArg> = (
  root,
  { key },
  ctx
): Promise<string> => {
  return new Promise((resolve, reject) => {
    // @ts-ignore
    redisClient.dumpBuffer(key, function(err: Error, result: Buffer) {
      if (err || result === null) return reject(err.message);
      const dumpStringCodePoint = [];

      for (const v of result.values()) {
        dumpStringCodePoint.push(v);
      }

      return resolve(String.fromCodePoint(...dumpStringCodePoint));
    });
  });
};

export const typeDefs = gql`
  extend type Query {
    """
    **DUMP key**

    Return a serialized version of the value stored at the specified key.
    [Read more >>](https://redis.io/commands/dump)
    """
    _dump(key: String!): String
  }
`;
