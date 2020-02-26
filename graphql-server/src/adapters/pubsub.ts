import Redis from "ioredis";
import { PubSub } from "apollo-server";
import { REDWIGS_REDIS_PATTERN_PUBSUB, REDWIGS_REDIS_PUBSUB } from "./redwigs";

export const pubsub = new PubSub();
export const subscriber = new Redis();
const publisher = new Redis();

subscriber.psubscribe("*");
process.on("exit", () => subscriber.punsubscribe("*"));

subscriber.on("pmessage", async (pattern, channel, message) => {
  if (pattern !== "*") {
    pubsub.publish(REDWIGS_REDIS_PATTERN_PUBSUB, {
      _psubscribe: { pattern, channel, message }
    });
  }
});

subscriber.on("message", async (channel, message) => {
  console.log({ channel, message, y: "r" });
  pubsub.publish(REDWIGS_REDIS_PUBSUB, { _subscribe: { channel, message } });
});
