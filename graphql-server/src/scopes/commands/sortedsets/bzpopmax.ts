import gql from "graphql-tag";
import { ResolverFunction } from "@typings";
import { redisClient } from "@adapters/redis";
import _ from "lodash";

export type BZPopMaxArgs = {
  keys: string[];
  timeout: number;
};

export const _bzpopmax: ResolverFunction<BZPopMaxArgs> = async (
  root,
  { keys, timeout },
  ctx
): Promise<string | number> => {
  try {
    const args: any[] = [...keys, timeout];
    const reply = await redisClient.send_command("bzpopmax", ...args);
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
    **BZPOPMAX key [key ...] timeout**

    Remove and return the member with the highest score from one or more sorted sets, or block until one is available.
    [Read more >>](https://redis.io/commands/bzpopmax)
    """
    _bzpopmax(keys: [String!]!, timeout: Int!): JSON
  }
`;
