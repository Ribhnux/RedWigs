import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";
import { KeyType } from "./type";

export type ScanArg = {
  cursor: number;
  key?: string;
  match?: string;
  count?: number;
  type?: KeyType;
};

export enum ScanType {
  SCAN = "scan",
  SSCAN = "sscan",
  HSCAN = "hscan",
  ZSCAN = "zscan"
}

export type ScanResult = {
  cursor: number;
  keys: string[] | any;
  _next?: ScanResult;
  _prevArgs?: ScanArg;
};

export type DoScanParams = {
  scanCommand: ScanType;
  args?: ScanArg;
  prevArgs?: ScanArg;
};

export const doScan = async ({
  scanCommand,
  args,
  prevArgs
}: DoScanParams): Promise<ScanResult> => {
  const useArgs: ScanArg = prevArgs ? prevArgs : args;
  const buildScanArg = (cursor: number) => {
    const { match, count, type, key } = useArgs;
    const _args: any[] = [];
    if (key) _args.push(key);
    _args.push(cursor);
    if (match) _args.push("MATCH", match);
    if (count) _args.push("COUNT", count);
    if (type) _args.push("TYPE", type);
    return _args;
  };

  const commandArg = buildScanArg(args.cursor);

  const [cursorResult, keysResult] = await redisClient.send_command(
    scanCommand,
    ...commandArg
  );

  const scanResult = {
    cursor: cursorResult,
    keys: keysResult,
    _prevArgs: useArgs
  };

  return scanResult;
};

export const typeResolvers = {
  RedisScanResult: {
    _next: async (args: ScanResult): Promise<ScanResult> => {
      return await doScan({
        scanCommand: ScanType.SCAN,
        args,
        prevArgs: args._prevArgs
      });
    }
  }
};

export const _scan: ResolverFunction<ScanArg> = async (
  root,
  args,
  ctx
): Promise<ScanResult> => {
  try {
    return await doScan({ scanCommand: ScanType.SCAN, args });
  } catch (err) {
    return err.message;
  }
};

export const typeDefs = gql`
  type RedisScanResult {
    cursor: Int
    keys: [String]
    _next: RedisScanResult
  }

  extend type Query {
    """
    Incrementally iterate the keys space. [Read more >>](https://redis.io/commands/scan)
    """
    _scan(
      cursor: Int!
      match: String
      count: Int
      type: KeyType
    ): RedisScanResult
  }
`;
