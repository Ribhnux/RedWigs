import gql from "graphql-tag";
import { ResolverFunction } from "@typings";
import { redisClient } from "@adapters/redis";

export type ZLexCountArgs = {
  key: string;
  min: string;
  max: string;
};

export const _zlexcount: ResolverFunction<ZLexCountArgs> = async (
  root,
  { key, min, max },
  ctx
): Promise<number> => {
  try {
    const reply = await redisClient.send_command("zlexcount", key, min, max);

    return reply;
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  extend type Query {
    """
    **ZLEXCOUNT key min max**

    Count the number of members in a sorted set between a given lexicographical range.
    [Read more >>](https://redis.io/commands/zlexcount)
    """
    _zlexcount(key: String!, min: String!, max: String!): Int
  }
`;
