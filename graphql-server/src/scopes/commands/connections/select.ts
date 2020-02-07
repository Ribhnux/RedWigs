import gql from "graphql-tag";
import { ResolverFunction } from "@typings";
import { redisClient } from "@adapters/redis";

export type SelectArg = {
  index: number;
};

export const _select: ResolverFunction<SelectArg> = async (
  root,
  { index },
  ctx
): Promise<string> => {
  try {
    const value = await redisClient.select(index);
    return value;
  } catch (err) {
    return err.message;
  }
};

export const typeDefs = gql`
  extend type Mutation {
    """
    Change the selected database for the current connection. [Read more >>](https://redis.io/commands/select)
    """
    _select(index: Int!): String
  }
`;
