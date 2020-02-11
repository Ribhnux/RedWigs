import gql from "graphql-tag";
import { ResolverFunction } from "@typings";
import { redisClient } from "@adapters/redis";

export type ZRemRangeByLexArgs = {
  key: string;
  min: string;
  max: string;
};

export const _zremrangebylex: ResolverFunction<ZRemRangeByLexArgs> = async (
  root,
  { key, min, max },
  ctx
): Promise<number> => {
  try {
    const args: any[] = [key, min, max];

    const reply = await redisClient.send_command("zremrangebylex", args);
    return reply;
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  extend type Mutation {
    """
    **ZREMRANGEBYLEX key min max**

    Remove all members in a sorted set between the given lexicographical range.
    [Read more >>](https://redis.io/commands/zremrangebylex)
    """
    _zremrangebylex(key: String!, min: String!, max: String!): Int
  }
`;
