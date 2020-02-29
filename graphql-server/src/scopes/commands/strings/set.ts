import gql from "graphql-tag";
import { ResolverFunction, OKResp, OK } from "@typings";
import { redisClient } from "@adapters/redis";

enum SetExpireMode {
  EX = "EX",
  PX = "PX"
}

enum SetMode {
  NX,
  XX
}

export type SetArg = {
  key: string;
  value: string;
  expireMode: SetExpireMode;
  time: number;
  mode: SetMode;
  keepTTL?: Boolean;
};

export const _set: ResolverFunction<SetArg> = async (
  root,
  { key, value, expireMode, time, mode, keepTTL },
  ctx
): Promise<OKResp | null> => {
  try {
    const setArgs: any[] = [key, value];
    if (expireMode) setArgs.push(expireMode, time);
    if (mode) setArgs.push(mode);

    const reply = await redisClient.set.apply(redisClient, setArgs);
    if (reply === OK) return OK;
    return null;
  } catch (err) {
    return null;
  }
};

export const typeDefs = gql`
  enum SetExpireMode {
    EX
    PX
  }

  enum SetMode {
    NX
    XX
  }

  extend type Mutation {
    """
    **SET key value [EX seconds|PX milliseconds] [NX|XX] [KEEPTTL]**

    Set key to hold the string value. [Read more >>](https://redis.io/commands/set)
    """
    _set(
      key: String!
      value: String!
      expireMode: SetExpireMode
      time: Int
      mode: SetMode
      KeepTTL: Boolean
    ): OK
  }
`;
