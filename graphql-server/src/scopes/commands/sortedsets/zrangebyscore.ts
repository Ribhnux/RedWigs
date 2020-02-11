import gql from "graphql-tag";
import { ResolverFunction } from "@typings";
import { redisClient } from "@adapters/redis";
import _ from "lodash";
import { Limit } from "./zrangebylex";

export type ZRangeByScoreArgs = {
  key: string;
  min: string;
  max: string;
  with_scores?: boolean;
  limit?: Limit;
};

export const _zrangebyscore: ResolverFunction<ZRangeByScoreArgs> = async (
  root,
  { key, min, max, with_scores, limit },
  ctx
): Promise<string[]> => {
  try {
    const args: any[] = [];
    const isWithScores = with_scores === true;
    if (isWithScores) args.push("WITHSCORES");
    if (limit) args.push("LIMIT", limit.offset, limit.count);

    const reply = await redisClient.zrangebyscore(key, min, max, ...args);
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
    **ZRANGEBYSCORE key min max [WITHSCORES] [LIMIT offset count]**

    Return a range of members in a sorted set, by score. [Read more >>](https://redis.io/commands/zrangebyscore)
    """
    _zrangebyscore(
      key: String!
      min: String!
      max: String!
      with_scores: Boolean
      limit: Limit
    ): JSON
  }
`;
