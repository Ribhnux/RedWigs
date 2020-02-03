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
  args: {
    key: string;
    value: string;
    expireMode: SetExpireMode;
    time: number;
    mode: SetMode;
    keepTTL?: Boolean;
  };
};

export const _set: ResolverFunction<SetArg> = async (
  root,
  { args: { key, value, expireMode, time, mode, keepTTL } },
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
    console.error(err);
    return null;
  }
};

export const schema = gql`
  enum SetExpireMode {
    EX
    PX
  }

  enum SetMode {
    NX
    XX
  }

  input SetInput {
    key: String!
    value: String!
    expireMode: SetExpireMode
    time: Int
    mode: SetMode
    KeepTTL: Boolean
  }

  extend type Mutation {
    """
    Set key to hold the string value. [See more >>](https://redis.io/commands/set)
    """
    _set(args: SetInput): OK
  }
`;
