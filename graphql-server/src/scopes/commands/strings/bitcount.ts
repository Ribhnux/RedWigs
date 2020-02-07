import { gql } from "apollo-server";
import { ResolverFunction, IntResp, ErrResp } from "@typings";
import { redisClient } from "@adapters/redis";

export type BitCountArgs = {
  key: string;
  start?: number;
  end?: number;
};

export const _bitcount: ResolverFunction<BitCountArgs> = async (
  root,
  { key, start, end },
  ctx
): Promise<IntResp> => {
  try {
    const args: any[] = [key];
    if (start !== undefined) args.push(start);
    if (end !== undefined) args.push(end);

    const reply = await redisClient.send_command("bitcount", ...args);
    return reply;
  } catch (err) {
    return err.message;
  }
};

export const typeDefs = gql`
  extend type Query {
    """
    Count set bits in a string. [Read more >>](https://redis.io/commands/bitcount)
    """
    _bitcount(key: String!, start: Int, end: Int): Int
  }
`;
