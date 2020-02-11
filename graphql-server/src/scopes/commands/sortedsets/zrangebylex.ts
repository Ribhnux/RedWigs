import gql from "graphql-tag";
import { ResolverFunction } from "@typings";
import { redisClient } from "@adapters/redis";
import _ from "lodash";

export type Limit = {
  offset: number;
  count: number;
};

export type ZRangeByLexArgs = {
  key: string;
  min: string;
  max: string;
  limit: Limit;
};

export const _zrangebylex: ResolverFunction<ZRangeByLexArgs> = async (
  root,
  { key, min, max, limit },
  ctx
): Promise<string[]> => {
  try {
    const args: any[] = [key, min, max];
    if (limit) args.push("LIMIT", limit.offset, limit.count);
    const reply = await redisClient.send_command("zrangebylex", ...args);
    return reply;
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  input Limit {
    offset: Int!
    count: Int!
  }
  extend type Query {
    """
    **ZRANGEBYLEX key min max [LIMIT offset count]**

    Return a range of members in a sorted set, by lexicographical range.
    [Read more >>](https://redis.io/commands/zrangebylex)
    """
    _zrangebylex(
      key: String!
      min: String!
      max: String!
      limit: Limit
    ): [String]
  }
`;
