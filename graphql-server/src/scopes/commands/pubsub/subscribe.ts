import gql from "graphql-tag";
import { pubsub, subscriber } from "@adapters/pubsub";
import { withFilter } from "apollo-server";
import { parseJSONOrKeep, convertToJSONOrKeep } from "@utils/json";
import __ from "lodash";
import {
  redwigsClient,
  REDWIGS_PUBSUB_CHANNEL_DATA,
  REDWIGS_REDIS_PUBSUB
} from "@adapters/redwigs";
import delay from "delay";
import { parseValueToJSONTransformer } from "@utils/collections";

export type SubscribeArgs = {
  channels: string[];
};

export type SubscribePayload = {
  _subscribe: {
    channel: string;
    message: string;
    isFirstTime?: boolean;
  };
};

const replyInitialSubscription = async (channels: string[]) => {
  try {
    await delay(50);
    pubsub.publish(REDWIGS_REDIS_PUBSUB, {
      _subscribe: { isFirstTime: true }
    });
  } catch (error) {
    throw new Error(error);
  }
};

const resolve = async (
  { _subscribe: { channel, message } }: SubscribePayload,
  { channels }: SubscribeArgs
): Promise<any> => {
  try {
    const reply = await redwigsClient.hmget(
      REDWIGS_PUBSUB_CHANNEL_DATA,
      ...channels
    );

    const previousValue = __.chain(channels)
      .zipObject(reply)
      .transform(parseValueToJSONTransformer, {})
      .value();

    const parsedMessage = parseJSONOrKeep(message);
    const previousMessage = previousValue[channel];
    const equalWithPreviousValue = __.isEqual(parsedMessage, previousMessage);

    if (!equalWithPreviousValue) {
      const reply = await redwigsClient.hset(
        REDWIGS_PUBSUB_CHANNEL_DATA,
        channel,
        convertToJSONOrKeep(message)
      );
      previousValue[channel] = parsedMessage;
    }

    return previousValue;
  } catch (err) {
    throw new Error(err);
  }
};

const asyncIteratorFn = (
  _,
  { channels }: SubscribeArgs
): AsyncIterator<any> => {
  try {
    subscriber.subscribe(...channels);
    return pubsub.asyncIterator(REDWIGS_REDIS_PUBSUB);
  } finally {
    replyInitialSubscription(channels);
  }
};

const passFilter = (
  channels: string[],
  { _subscribe: { channel, isFirstTime } }: SubscribePayload
): boolean => isFirstTime || channels.includes(channel);

const filterFn = async (
  payload: SubscribePayload,
  { channels }: SubscribeArgs
): Promise<boolean> => passFilter(channels, payload);

const subscribe = withFilter(asyncIteratorFn, filterFn);
export const _subscribe = {
  resolve,
  subscribe
};

export const typeDefs = gql`
  extend type Subscription {
    """
    **SUBSCRIBE channel [channel...]**

    Listen for messages published to the given channels.
    [Read more >>](https://redis.io/commands/subscribe)
    """
    _subscribe(channels: [String!]!): JSON
  }
`;
