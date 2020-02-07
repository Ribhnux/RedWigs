import { gql } from "apollo-server";
import { ResolverFunction, IntResp, ErrResp } from "@typings";
import { redisClient } from "@adapters/redis";

export enum BitOperation {
  AND = "AND",
  OR = "OR",
  XOR = "XOR",
  NOT = "NOT"
}

export type BitOpArgs = {
  operation: BitOperation;
  destkey: string;
  keys: string[];
};

export const _bitop: ResolverFunction<BitOpArgs> = async (
  root,
  { operation, destkey, keys },
  ctx
): Promise<IntResp> => {
  try {
    if (keys.length <= 0) throw Error("Keys must be more or equal to 1");

    const args = [operation, destkey];
    keys.forEach(k => args.push(k));

    const reply = await redisClient.send_command("bitop", ...args);
    return reply;
  } catch (err) {
    return err.message;
  }
};

export const typeDefs = gql`
  enum BitOperation {
    AND
    OR
    XOR
    NOT
  }

  extend type Mutation {
    """
    Perform bitwise operations between strings. [Read more >>](https://redis.io/commands/bitop)
    """
    _bitop(operation: BitOperation!, destkey: String!, keys: [String!]!): Int
  }
`;
