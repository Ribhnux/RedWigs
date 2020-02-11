import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";
import _ from "lodash";

export type ZPopMaxArgs = {
  key: string;
  count?: number;
};

export const _zpopmax: ResolverFunction<ZPopMaxArgs> = async (
  root,
  { key, count },
  ctx
): Promise<string | number> => {
  try {
    const args: any[] = [key];
    if (count) args.push(count);
    const reply = await redisClient.send_command("zpopmax", ...args);
    const result = _.merge(
      {},
      ..._.chain(reply)
        .chunk(2)
        .map(([member, score]) => ({ [member]: parseFloat(score) }))
        .value()
    );
    return result;
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  extend type Mutation {
    """
    **ZPOPMAX key [count]**

    Remove and return members with the highest scores in a sorted set.
    [Read more >>](https://redis.io/commands/zpopmax)
    """
    _zpopmax(key: String!, count: Int): JSON
  }
`;
