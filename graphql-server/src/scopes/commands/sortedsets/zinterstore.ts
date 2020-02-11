import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";
import { Aggregate } from "./zunionstore";

export type ZInterStoreArgs = {
  destination: string;
  numkeys: number;
  keys: string[];
  weights?: number[];
  aggregate?: Aggregate;
};

export const _zinterstore: ResolverFunction<ZInterStoreArgs> = async (
  root,
  { destination, numkeys, keys, weights, aggregate },
  ctx
): Promise<IntResp> => {
  try {
    const args: any[] = [destination, numkeys, ...keys];
    if (weights && weights.length > 0) args.push("WEIGHTS", ...weights);
    if (aggregate) args.push(aggregate);
    const reply = await redisClient.send_command("zinterstore", ...args);
    return reply;
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  extend type Mutation {
    """
    **ZINTERSTORE destination numkeys key [key ...] [WEIGHTS weight [weight ...]] [AGGREGATE SUM|MIN|MAX]**

    Intersect multiple sorted sets and store the resulting sorted set in a new key.
    [Read more >>](https://redis.io/commands/zinterstore)
    """
    _zinterstore(
      destination: String!
      numkeys: Int!
      keys: [String!]!
      weights: [Int]
      aggregate: Aggregate
    ): Int
  }
`;
