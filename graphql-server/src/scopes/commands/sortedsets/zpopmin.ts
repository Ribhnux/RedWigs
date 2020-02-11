import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";
import _ from "lodash";

export type ZPopMinArgs = {
  key: string;
  count?: number;
};

export const _zpopmin: ResolverFunction<ZPopMinArgs> = async (
  root,
  { key, count },
  ctx
): Promise<string | number> => {
  try {
    const args: any[] = [key];
    if (count) args.push(count);
    const reply = await redisClient.send_command("zpopmin", ...args);
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
    **ZPOPMIN key [count]**

    Remove and return members with the lowest scores in a sorted set.
    [Read more >>](https://redis.io/commands/zpopmin)
    """
    _zpopmin(key: String!, count: Int): JSON
  }
`;
