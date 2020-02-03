import gql from "graphql-tag";
import { ResolverFunction, OKResp, OK, KeyValue } from "@typings";
import { redisClient } from "@adapters/redis";

export type MSetArg = {
  args: KeyValue[];
};

export const _mset: ResolverFunction<MSetArg> = async (
  root,
  { args: keyValues },
  ctx
): Promise<OKResp> => {
  try {
    const msetArgs = keyValues.map(({ key, value }) => [key, value]).flat();
    const reply = await redisClient.mset.apply(redisClient, msetArgs);
    return OK;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const schema = gql`
  input KeyValues {
    key: String!
    value: String!
  }

  extend type Mutation {
    """
    Set multiple keys to multiple values. [See more >>](https://redis.io/commands/mset)
    """
    _mset(args: [KeyValues!]!): OK
  }
`;
