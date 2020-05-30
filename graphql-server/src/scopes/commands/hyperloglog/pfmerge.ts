import gql from "graphql-tag";
import { ResolverFunction, IntResp, OKResp } from "@typings";
import { redisClient } from "@adapters/redis";

export type PFMergeArgs = {
  destkey: string;
  sourcekey: string[];
};

export const _pfmerge: ResolverFunction<PFMergeArgs> = async (
  root,
  { destkey, sourcekey },
  ctx
): Promise<OKResp> => {
  try {
    const reply = await redisClient.pfmerge(destkey, ...sourcekey);
    return reply;
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  extend type Mutation {
    """
    **PFMERGE destkey sourcekey [sourcekey ...]**

    Merge N different HyperLogLogs into a single one.
    [Read more >>](https://redis.io/commands/pfmerge)
    """
    _pfmerge(destkey: String!, sourcekey: [String!]!): String
  }
`;
