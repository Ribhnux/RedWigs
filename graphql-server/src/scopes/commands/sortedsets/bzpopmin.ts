import gql from "graphql-tag";
import { ResolverFunction } from "@typings";
import { redisClient } from "@adapters/redis";
import _ from "lodash";

export type BZPopMinArgs = {
  keys: string[];
  timeout: number;
};

export const _bzpopmin: ResolverFunction<BZPopMinArgs> = async (
  root,
  { keys, timeout },
  ctx
): Promise<string | number> => {
  try {
    const args: any[] = [...keys, timeout];
    const reply = await redisClient.send_command("bzpopmin", ...args);
    const result = _.merge(
      {},
      ..._.chain(reply)
        .chunk(3)
        .map(([key, member, score]) => ({
          [key]: { [member]: parseFloat(score) }
        }))
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
    **BZPOPMIN key [key ...] timeout**

    Remove and return members with the lowest scores in a sorted set.
    [Read more >>](https://redis.io/commands/bzpopmin)
    """
    _bzpopmin(keys: [String!]!, timeout: Int!): JSON
  }
`;
