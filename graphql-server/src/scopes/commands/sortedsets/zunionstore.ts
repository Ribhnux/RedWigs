import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";

export enum Aggregate {
  SUM = "SUM",
  MIN = "MIN",
  MAX = "MAX"
}

export type ZUnionStoreArgs = {
  destination: string;
  numkeys: number;
  keys: string[];
  weights?: number[];
  aggregate?: Aggregate;
};

export const _zunionstore: ResolverFunction<ZUnionStoreArgs> = async (
  root,
  { destination, numkeys, keys, weights, aggregate },
  ctx
): Promise<IntResp> => {
  try {
    const args: any[] = [destination, numkeys, ...keys];
    if (weights && weights.length > 0) args.push("WEIGHTS", ...weights);
    if (aggregate) args.push(aggregate);
    const reply = await redisClient.send_command("zunionstore", ...args);
    return reply;
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  enum Aggregate {
    SUM
    MIN
    MAX
  }
  extend type Mutation {
    """
    **ZUNIONSTORE destination numkeys key [key ...] [WEIGHTS weight [weight ...]] [AGGREGATE SUM|MIN|MAX]**

    Add multiple sorted sets and store the resulting sorted set in a new key.
    [Read more >>](https://redis.io/commands/zunionstore)
    """
    _zunionstore(
      destination: String!
      numkeys: Int!
      keys: [String!]!
      weights: [Int]
      aggregate: Aggregate
    ): Int
  }
`;
