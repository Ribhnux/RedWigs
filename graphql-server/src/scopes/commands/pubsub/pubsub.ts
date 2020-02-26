import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";
import _ from "lodash";
import { transformMerge } from "@utils/collections";

export enum PubSubCommand {
  CHANNELS = "CHANNELS",
  NUMSUB = "NUMSUB",
  NUMPAT = "NUMPAT"
}

export type PubsubArgs = {
  subcommand: PubSubCommand;
  arguments?: string[];
};

export const _pubsub: ResolverFunction<PubsubArgs> = async (
  root,
  { subcommand, arguments: subarguments },
  ctx
): Promise<any> => {
  try {
    const args: any[] = [subcommand];
    if (subcommand === PubSubCommand.CHANNELS) {
      if (subarguments && subarguments.length === 1) args.push(subarguments[0]);
    }

    if (subcommand === PubSubCommand.NUMSUB) {
      if (subarguments && subarguments.length >= 1) args.push(...subarguments);
    }

    const reply = await redisClient.send_command("PUBSUB", ...args);
    if (subcommand === PubSubCommand.CHANNELS) {
      return reply.filter(v => !v.match(new RegExp("redwigs:redis")));
    }

    if (subcommand === PubSubCommand.NUMSUB) {
      return transformMerge(reply, 2, ([channel, count]) => ({
        [channel]: count
      }));
    }

    return reply;
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  enum PubSubCommand {
    CHANNELS
    NUMSUB
    NUMPAT
  }

  extend type Query {
    """
    **PUBSUB subcommand [argument [argument ...]]**

    Inspect the state of the Pub/Sub subsystem.
    [Read more >>](https://redis.io/commands/pubsub)
    """
    _pubsub(subcommand: PubSubCommand!, arguments: [String]): JSON
  }
`;
