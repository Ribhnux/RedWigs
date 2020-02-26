import Redis from "ioredis";

const opts = { db: 10 };
export const redwigsClient = new Redis(opts);
export const redwigsSubscriber = new Redis(opts);
export const REDWIGS_PUBSUB_CHANNEL_DATA = "redwigs:redis:pubsub:channels";
export const REDWIGS_REDIS_PUBSUB = "redwigs:pubsub:common";
export const REDWIGS_REDIS_PATTERN_PUBSUB = "redwigs:pubsub:pattern";

// export const REDWIGS_PUBSUB_PATTERN_CHANNEL_DATA =
//   "redwigs:redis:pubsub:pattern:data";
// export const REDWIGS_REDIS_UNSUBSCRIBE_ALL = "redwigs:redis:unsubscribe";
