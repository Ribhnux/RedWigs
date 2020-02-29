import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";

export type MoveArg = {
  key: string;
  db: string;
};

export const _move: ResolverFunction<MoveArg> = async (
  root,
  { key, db },
  ctx
): Promise<IntResp> => {
  try {
    const reply = await redisClient.move(key, db);
    return reply;
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  extend type Mutation {
    """
    **MOVE key db**

    Move a key to another database.
    [Read more >>](https://redis.io/commands/move)
    """
    _move(key: String!, db: String!): Int
  }
`;
