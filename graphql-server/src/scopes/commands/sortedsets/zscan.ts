import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";
import { ScanArg, ScanResult, doScan, ScanType } from "../keys/scan";

export type ZScanArgs = { key: string } & ScanArg;

export const typeResolvers = {
  RedisSScanResult: {
    _next: async (args: ScanResult): Promise<ScanResult> => {
      return await doScan({
        scanCommand: ScanType.ZSCAN,
        args,
        prevArgs: args._prevArgs
      });
    }
  }
};

export const _zscan: ResolverFunction<ZScanArgs> = async (
  root,
  args,
  ctx
): Promise<ScanResult> => {
  try {
    return await doScan({ scanCommand: ScanType.ZSCAN, args });
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  extend type Query {
    """
    Incrementally iterate sorted sets elements and associated scores.
    [Read more >>](https://redis.io/commands/zscan)
    """
    _zscan(
      key: String!
      cursor: Int!
      match: String
      count: Int
      type: KeyType
    ): RedisScanResult
  }
`;
