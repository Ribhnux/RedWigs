import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";

export type PExpireAtArg = {
  key: string;
  milliseconds_timestamp: bigint;
};

export const _pexpireat: ResolverFunction<PExpireAtArg> = async (
  root,
  { key, milliseconds_timestamp },
  ctx
): Promise<IntResp> => {
  try {
    const reply = await redisClient.send_command(
      "pexpireat",
      key,
      BigInt(milliseconds_timestamp)
    );
    return reply;
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  extend type Mutation {
    """
    **PEXPIREAT key milliseconds-timestamp**

    Set the expiration for a key as a UNIX timestamp specified in milliseconds.
    [Read more >>](https://redis.io/commands/pexpireat)
    """
    _pexpireat(key: String!, milliseconds_timestamp: BigInt!): Int
  }
`;
