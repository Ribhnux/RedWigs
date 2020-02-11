import gql from "graphql-tag";
import { ResolverFunction } from "@typings";
import { redisClient } from "@adapters/redis";
import _ from "lodash";

export type Limit = {
  offset: number;
  count: number;
};

export type ZRevRangeByLexArgs = {
  key: string;
  min: string;
  max: string;
  limit: Limit;
};

export const _zrevrangebylex: ResolverFunction<ZRevRangeByLexArgs> = async (
  root,
  { key, min, max, limit },
  ctx
): Promise<string[]> => {
  try {
    const args: any[] = [key, max, min];
    if (limit) args.push("LIMIT", limit.offset, limit.count);

    const reply = await redisClient.send_command("zrevrangebylex", ...args);
    return reply;
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  extend type Query {
    """
    **ZREVRANGEBYLEX key max min [LIMIT offset count]**

    Return a range of members in a sorted set, by lexicographical range, ordered from higher to lower strings.
    [Read more >>](https://redis.io/commands/zrevrangebylex)
    """
    _zrevrangebylex(
      key: String!
      max: String!
      min: String!
      limit: Limit
    ): [String]
  }
`;
