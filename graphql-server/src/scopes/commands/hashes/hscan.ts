import gql from "graphql-tag";
import { ResolverFunction } from "@typings";
import { ScanArg, ScanResult, doScan, ScanType } from "../keys/scan";

export type HScanArg = { key: string } & ScanArg;

export const typeResolvers = {
  RedisSScanResult: {
    _next: async (args: ScanResult): Promise<ScanResult> => {
      return await doScan({
        scanCommand: ScanType.HSCAN,
        args,
        prevArgs: args._prevArgs
      });
    }
  }
};

export const _hscan: ResolverFunction<HScanArg> = async (
  root,
  args,
  ctx
): Promise<ScanResult> => {
  try {
    return await doScan({ scanCommand: ScanType.HSCAN, args });
  } catch (err) {
    return err.message;
  }
};

export const typeDefs = gql`
  extend type Query {
    """
    Incrementally iterate hash fields and associated values. [Read more >>](https://redis.io/commands/hscan)
    """
    _hscan(
      key: String!
      cursor: Int!
      match: String
      count: Int
      type: KeyType
    ): RedisScanResult
  }
`;
