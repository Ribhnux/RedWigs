import gql from "graphql-tag";
import {
  pubsub,
  subscriber
} from "@adapters/pubsub";
import { withFilter } from "apollo-server";
import __ from "lodash";
import { redwigsClient, REDWIGS_PUBSUB_CHANNEL_DATA, REDWIGS_REDIS_PATTERN_PUBSUB } from "@adapters/redwigs";
import { ScanType } from "../keys/scan";
import { parseJSONOrKeep, convertToJSONOrKeep } from "@utils/json";
import delay from "delay";
import {
  transformMerge,
  transformPairToParsedJSON,
  arrayToObjectNull
} from "@utils/collections";

export type PSubscribeArgs = {
  patterns: string[];
};

export type PSubscribePayload = {
  _psubscribe: {
    pattern: string;
    channel: string;
    message: any | null;
    isFirstTime?: boolean;
  };
};

const replyInitialSubscription = async (patterns: string[]) => {
  await delay(50);
  pubsub.publish(REDWIGS_REDIS_PATTERN_PUBSUB, {
    _psubscribe: {
      isFirstTime: true
    }
  });
};

const resolve = async (
  {
    _psubscribe: { pattern, channel, message, isFirstTime }
  }: PSubscribePayload,
  { patterns }: PSubscribeArgs
): Promise<any> => {
  if (isFirstTime && isFirstTime === true) {
    return __.transform(patterns, arrayToObjectNull, {});
  }

  const hscans = patterns.map(_pattern =>
    redwigsClient.send_command(
      ScanType.HSCAN,
      ...[REDWIGS_PUBSUB_CHANNEL_DATA, 0, "MATCH", _pattern]
    )
  );

  const reply = await Promise.all(hscans);
  const patternScanPair = __.zipObject(patterns, reply);

  const toChannelParsedValuePair = (result: any, value: any, key: any) => {
    const [channel, message] = value;
    result[channel] = parseJSONOrKeep(message);
  };

  const toPatternResults = (result: any, value: any, key: any) => {
    const [, scanResult] = patternScanPair[pattern];
    const parsedResult = __.chain(scanResult)
      .chunk(2)
      .transform(toChannelParsedValuePair, {})
      .value();

    result[key] = parsedResult;
  };

  const scanResult = __.transform(patternScanPair, toPatternResults, {});
  const parsedMessage = parseJSONOrKeep(message);
  const previousMessage = scanResult[pattern][channel];
  const equalWithPreviousValue = __.isEqual(previousMessage, parsedMessage);
  if (!equalWithPreviousValue) {
    const reply = await redwigsClient.hset(
      REDWIGS_PUBSUB_CHANNEL_DATA,
      channel,
      convertToJSONOrKeep(message)
    );

    scanResult[pattern][channel] = parsedMessage;
  }

  return scanResult;
};

const asyncIteratorFn = (
  _,
  { patterns }: PSubscribeArgs
): AsyncIterator<any> => {
  try {
    subscriber.psubscribe(...patterns);
    return pubsub.asyncIterator(REDWIGS_REDIS_PATTERN_PUBSUB);
  } finally {
    replyInitialSubscription(patterns);
  }
};

const passFilter = (
  patterns: string[],
  { _psubscribe: { pattern, isFirstTime } }: PSubscribePayload
): boolean => isFirstTime || patterns.includes(pattern);

const filterFn = async (
  payload: PSubscribePayload,
  { patterns }: PSubscribeArgs
): Promise<boolean> => passFilter(patterns, payload);

const subscribe = withFilter(asyncIteratorFn, filterFn);
export const _psubscribe = {
  resolve,
  subscribe
};

export const typeDefs = gql`
  extend type Subscription {
    """
    **PSUBSCRIBE pattern [pattern ...]**

    Listen for messages published to channels matching the given patterns.
    [Read more >>](https://redis.io/commands/psubscribe)
    """
    _psubscribe(patterns: [String!]!): JSON
  }
`;
