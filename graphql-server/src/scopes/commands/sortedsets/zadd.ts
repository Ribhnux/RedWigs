import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";

enum ZAddMode {
  NX = "NX",
  XX = "XX"
}

export type ZAddArgs = {
  key: string;
  mode?: ZAddMode;
  changed?: boolean;
  incr?: boolean;
  pairs: {
    score: number;
    member: string;
  }[];
};

export const _zadd: ResolverFunction<ZAddArgs> = async (
  root,
  { key, mode, changed, incr, pairs },
  ctx
): Promise<string | number> => {
  try {
    const args = [];
    if (mode) args.push(mode);
    if (changed === true) args.push("CH");
    if (incr === true) args.push("INCR");

    const data: any[] = pairs.map(v => [v.score, v.member]).flat();
    args.push(...data);

    const reply = await redisClient.zadd(key, ...args);

    return reply;
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  enum ZAddMode {
    NX
    XX
  }

  input SortedSetPairData {
    score: Int!
    member: String!
  }

  extend type Mutation {
    """
    **ZADD key [NX|XX] [CH] [INCR] score member [score member ...]**

    Add one or more members to a sorted set, or update its score if it already exists.
    [Read more >>](https://redis.io/commands/zadd)
    """
    _zadd(
      key: String!
      mode: ZAddMode
      changed: Boolean
      incr: Boolean
      pairs: [SortedSetPairData!]!
    ): JSON
  }
`;
