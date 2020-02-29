import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";

export type WaitArg = {
  numreplicas: number;
  timeout: number;
};

export const _wait: ResolverFunction<WaitArg> = async (
  root,
  { numreplicas, timeout },
  ctx
): Promise<IntResp> => {
  const reply = await redisClient.send_command(
    "wait",
    ...[numreplicas, timeout]
  );
  return reply;
};

export const typeDefs = gql`
  extend type Mutation {
    """
    **WAIT numreplicas timeout**

    Wait for the synchronous replication of all the write commands sent in the context of the current connection.
    [Read more >>](https://redis.io/commands/wait)
    """
    _wait(numreplicas: Int!, timeout: Int!): Int
  }
`;
