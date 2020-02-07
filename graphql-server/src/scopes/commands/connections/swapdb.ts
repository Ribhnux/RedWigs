import gql from "graphql-tag";
import { ResolverFunction } from "@typings";
import { redisClient } from "@adapters/redis";

export type SwapDBArg = {
  index1: number;
  index2: number;
};

export const _swapdb: ResolverFunction<SwapDBArg> = async (
  root,
  { index1, index2 },
  ctx
): Promise<string> => {
  try {
    const value = await redisClient.send_command("swapdb", ...[index1, index2]);
    return value;
  } catch (err) {
    return err.message;
  }
};

export const typeDefs = gql`
  extend type Mutation {
    """
    Change the selected database for the current connection. [Read more >>](https://redis.io/commands/swapdb)
    """
    _swapdb(index1: Int!, index2: Int!): String
  }
`;
