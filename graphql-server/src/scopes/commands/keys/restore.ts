import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";

export type RestoreArg = {
  key: string;
  ttl: number;
  serialized_value: string;
  replace?: boolean;
  absttl?: boolean;
  idletime?: number;
  freq?: number;
};

export const _restore: ResolverFunction<RestoreArg> = async (
  root,
  { key, ttl, serialized_value, replace, absttl, idletime, freq },
  ctx
): Promise<string> => {
  try {
    const args = [key, ttl, Buffer.from(serialized_value, "binary")];
    if (replace === true) args.push("REPLACE");
    if (absttl === true) args.push("ABSTTL");

    if (typeof idletime !== "undefined") {
      args.push("IDLETIME", idletime);
    }

    if (typeof freq !== "undefined") {
      args.push("FREQ", freq);
    }

    const reply = await redisClient.restore(...args);
    return reply;
  } catch (err) {
    return err.message;
  }
};

export const typeDefs = gql`
  extend type Mutation {
    """
    Create a key using the provided serialized value, previously obtained using DUMP.
    [Read more >>](https://redis.io/commands/restore)
    """
    _restore(
      key: String!
      ttl: Int!
      serialized_value: String!
      replace: Boolean
      absttl: Boolean
      idletime: Int
      freq: Int
    ): String
  }
`;
