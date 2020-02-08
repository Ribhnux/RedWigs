import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";
import { ScanArg, ScanResult, doScan, ScanType } from "../keys/scan";

export type SScanArg = { key: string } & ScanArg;

export const typeResolvers = {
  RedisSScanResult: {
    _next: async (args: ScanResult): Promise<ScanResult> => {
      return await doScan({
        scanCommand: ScanType.SSCAN,
        args,
        prevArgs: args._prevArgs
      });
    }
  }
};

export const _sscan: ResolverFunction<SScanArg> = async (
  root,
  args,
  ctx
): Promise<ScanResult> => {
  try {
    return await doScan({ scanCommand: ScanType.SSCAN, args });
  } catch (err) {
    return err.message;
  }
};

export const typeDefs = gql`
  extend type Query {
    """
    Incrementally iterate the keys space. [Read more >>](https://redis.io/commands/scan)
    """
    _sscan(
      key: String!
      cursor: Int!
      match: String
      count: Int
      type: KeyType
    ): RedisScanResult
  }
`;
