import { gql } from "apollo-server";
import { ResolverFunction, IntResp, ErrResp } from "@typings";
import { redisClient } from "@adapters/redis";

export type BitPosArgs = {
  key: string;
  bit: number;
  start?: number;
  end?: number;
};

export const _bitpos: ResolverFunction<BitPosArgs> = async (
  root,
  { key, bit, start, end },
  ctx
): Promise<IntResp> => {
  try {
    const args = [key, bit];
    if (start !== undefined) args.push(start);
    if (end !== undefined) args.push(end);

    const reply = await redisClient.send_command("bitpos", ...args);
    return reply;
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  extend type Query {
    """
    Find first bit set or clear in a string. [Read more >>](https://redis.io/commands/bitpos)
    """
    _bitpos(key: String!, bit: Int!, start: Int, end: Int): Int
  }
`;
