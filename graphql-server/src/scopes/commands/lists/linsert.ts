import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";

export enum ListInsertReference {
  BEFORE = "BEFORE",
  AFTER = "AFTER"
}

export type LInsertArgs = {
  key: string;
  ref: ListInsertReference;
  pivot: string;
  element: any;
};

export const _linsert: ResolverFunction<LInsertArgs> = async (
  root,
  { key, ref, pivot, element },
  ctx
): Promise<number> => {
  try {
    const reply = await redisClient.linsert(key, ref, pivot, element);
    return reply;
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  enum ListInsertReference {
    BEFORE
    AFTER
  }
  extend type Mutation {
    """
    **LINSERT key BEFORE|AFTER pivot element**

    Insert an element before or after another element in a list.
    [Read more >>](https://redis.io/commands/linsert)
    """
    _linsert(
      key: String!
      ref: ListInsertReference!
      pivot: String!
      element: JSON!
    ): Int
  }
`;
