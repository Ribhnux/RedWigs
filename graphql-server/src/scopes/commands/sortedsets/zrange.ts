import gql from "graphql-tag";
import { ResolverFunction } from "@typings";
import { redisClient } from "@adapters/redis";
import _ from "lodash";

export type ZRangeArgs = {
  key: string;
  start: number;
  stop: number;
  with_scores?: boolean;
};

export const _zrange: ResolverFunction<ZRangeArgs> = async (
  root,
  { key, start, stop, with_scores },
  ctx
): Promise<any> => {
  try {
    const isWithScores = with_scores === true;
    const reply = isWithScores
      ? await redisClient.zrange(key, start, stop, "WITHSCORES")
      : await redisClient.zrange(key, start, stop);

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
    **ZRANGE key start stop [WITHSCORES]**

    Return a range of members in a sorted set, by index. [Read more >>](https://redis.io/commands/zrange)
    """
    _zrange(key: String!, start: Int!, stop: Int!, with_scores: Boolean): JSON
  }
`;
