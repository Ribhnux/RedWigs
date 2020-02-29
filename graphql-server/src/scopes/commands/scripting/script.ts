import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import zipObject from "lodash/zipObject";
import { redisClient } from "@adapters/redis";

export type ScriptLoadArgs = {
  script: string;
};

export type ScriptExistsArgs = {
  sha1: string[];
};

export enum DebugOptions {
  YES = "YES",
  SYNC = "SYNC",
  NO = "NO"
}

export type ScriptDebugArgs = {
  options: DebugOptions;
};

export const _script_load: ResolverFunction<ScriptLoadArgs> = async (
  root,
  { script },
  ctx
): Promise<IntResp> => {
  try {
    const result = await redisClient.send_command("SCRIPT", "LOAD", script);
    return result;
  } catch (err) {
    throw new Error(err);
  }
};

export const _script_exists: ResolverFunction<ScriptExistsArgs> = async (
  root,
  { sha1 },
  ctx
): Promise<any> => {
  try {
    const result = await redisClient.send_command("SCRIPT", "EXISTS", ...sha1);
    return zipObject(
      sha1,
      result.map((v: number) => (v === 1 ? true : false))
    );
  } catch (err) {
    throw new Error(err);
  }
};

export const _script_debug: ResolverFunction<ScriptDebugArgs> = async (
  root,
  { options }
): Promise<any> => {
  try {
    const result = await redisClient.send_command("SCRIPT", "DEBUG", options);
    return result;
  } catch (err) {
    throw new Error(err);
  }
};

export const _script_flush: ResolverFunction<any> = async (): Promise<string> => {
  try {
    const result = await redisClient.send_command("SCRIPT", "FLUSH");
    return result;
  } catch (err) {
    throw new Error(err);
  }
};

export const _script_kill: ResolverFunction<any> = async (): Promise<string> => {
  try {
    const result = await redisClient.send_command("SCRIPT", "KILL");
    return result;
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  enum DebugOptions {
    YES
    SYNC
    NO
  }

  extend type Query {
    """
    **SCRIPT EXISTS sha1 [sha1 ...]**

    Check existence of scripts in the script cache..
    [Read more >>](https://redis.io/commands/script-exists)
    """
    _script_exists(sha1: [String!]!): JSON
  }

  extend type Mutation {
    """
    **SCRIPT DEBUG YES|SYNC|NO**
    Set the debug mode for executed scripts.

    [Read more >>](https://redis.io/commands/script-debug)
    """
    _script_debug(options: DebugOptions): JSON

    """
    **SCRIPT FLUSH**
    Remove all the scripts from the script cache.

    [Read more >>](https://redis.io/commands/script-flush)
    """
    _script_flush: String

    """
    **SCRIPT KILL**
    Kill the script currently in execution.

    [Read more >>](https://redis.io/commands/script-kill)
    """
    _script_kill: String

    """
    **SCRIPT LOAD script**

    Load the specified Lua script into the script cache.
    [Read more >>](https://redis.io/commands/script-load)
    """
    _script_load(script: String!): String
  }
`;
