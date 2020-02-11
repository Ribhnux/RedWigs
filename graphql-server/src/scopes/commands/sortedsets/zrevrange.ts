import gql from "graphql-tag";
import { ResolverFunction } from "@typings";
import { redisClient } from "@adapters/redis";
import _ from "lodash";

export type ZRevRangeArgs = {
  key: string;
  start: number;
  stop: number;
  with_scores?: boolean;
};

export const _zrevrange: ResolverFunction<ZRevRangeArgs> = async (
  root,
  { key, start, stop, with_scores },
  ctx
): Promise<any> => {
  try {
    const isWithScores = with_scores === true;
    const reply = isWithScores
      ? await redisClient.zrevrange(key, start, stop, "WITHSCORES")
      : await redisClient.zrevrange(key, start, stop);

    const result = isWithScores
      ? _.merge(
          {},
          ..._.chain(reply)
            .chunk(2)
            .map(([member, score]) => ({ [member]: parseFloat(score) }))
            .value()
        )
      : reply;

    return result;
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  extend type Query {
    """
    **ZREVRANGE key start stop [WITHSCORES]**

    Return a range of members in a sorted set, by index, with scores ordered from high to low.
    [Read more >>](https://redis.io/commands/zrevrange)
    """
    _zrevrange(
      key: String!
      start: Int!
      stop: Int!
      with_scores: Boolean
    ): JSON
  }
`;
