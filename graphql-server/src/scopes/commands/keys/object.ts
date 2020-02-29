import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";

export enum Subcommand {
  REFCOUNT = "REFCOUNT",
  ENCODING = "ENCODING",
  IDLETIME = "IDLETIME",
  FREQ = "FREQ",
  HELP = "HELP"
}

export type ObjectArg = {
  subcommand: Subcommand;
  key?: string;
};

export const _object: ResolverFunction<ObjectArg> = async (
  root,
  { subcommand, key },
  ctx
): Promise<IntResp | string[]> => {
  try {
    const args = subcommand === Subcommand.HELP ? [] : [key];
    const reply = await redisClient.object(subcommand, ...args);
    return reply;
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  """
  The OBJECT command supports multiple sub commands
  """
  enum Subcommand {
    """
    ### OBJECT REFCOUNT <key>
    returns the number of references of the value associated with the specified key.
    This command is mainly useful for debugging.
    """
    REFCOUNT

    """
    ### OBJECT ENCODING <key>
    returns the kind of internal representation used in order to
    store the value associated with a key.
    """
    ENCODING

    """
    ### OBJECT IDLETIME <key>
    returns the number of seconds since the object stored at the specified key
    is idle (not requested by read or write operations).
    While the value is returned in seconds the actual resolution of this timer is 10 seconds,
    but may vary in future implementations. This subcommand is available when
    maxmemory-policy is set to an LRU policy or noeviction
    """
    IDLETIME

    """
    ### OBJECT FREQ <key>
    returns the logarithmic access frequency counter of the object stored at the specified key.
    This subcommand is available when maxmemory-policy is set to an LFU policy.
    """
    FREQ

    """
    ### OBJECT HELP
    returns a succinct help text.
    """
    HELP
  }

  extend type Query {
    """
    Inspect the internals of Redis objects. [Read more >>](https://redis.io/commands/object)
    """
    _object(subcommand: Subcommand!, key: String): RespBulk
  }
`;
