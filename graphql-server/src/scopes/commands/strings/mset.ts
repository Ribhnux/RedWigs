import gql from "graphql-tag";
import { ResolverFunction, OKResp, OK, KeyValue } from "@typings";
import { redisClient } from "@adapters/redis";

export type MSetArg = {
  data: any[];
};

export const _mset: ResolverFunction<MSetArg> = async (
  root,
  { data },
  ctx
): Promise<OKResp> => {
  try {
    const msetArgs = Object.keys(data)
      .map(key => [key, data[key]])
      .flat();
    const reply = await redisClient.mset.apply(redisClient, msetArgs);
    return reply;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const typeDefs = gql`
  input KeyValues {
    key: String!
    value: String!
  }

  extend type Mutation {
    """
    Set multiple keys to multiple values. [Read more >>](https://redis.io/commands/mset)
    """
    _mset(data: JSON!): OK
  }
`;
