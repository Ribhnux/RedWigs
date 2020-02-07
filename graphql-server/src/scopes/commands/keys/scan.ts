import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";
import { KeyType } from "./type";

export type ScanArg = {
  cursor: number;
  match?: string;
  count?: number;
  type: KeyType;
};

export type ScanResult = {
  cursor: number;
  keys: string[];
  _prevArgs: ScanArg;
  _next?: ScanResult;
};

export const typeResolvers = {
  RedisScanResult: {
    async _next({ cursor, _prevArgs }: ScanResult): Promise<ScanResult> {
      const buildScanArg = (cursor: number) => {
        const args: any[] = [cursor];
        if (_prevArgs.match) args.push("MATCH", _prevArgs.match);
        if (_prevArgs.count) args.push("COUNT", _prevArgs.count);
        if (_prevArgs.type) args.push("TYPE", _prevArgs.type);
        return args;
      };

      const [cursorResult, keysResult] = await redisClient.send_command(
        "scan",
        ...buildScanArg(cursor)
      );

      const scanResult: ScanResult = {
        cursor: cursorResult,
        keys: keysResult,
        _prevArgs: {
          cursor: _prevArgs.cursor,
          type: _prevArgs.type,
          count: _prevArgs.count,
          match: _prevArgs.match
        }
      };

      return scanResult;
    }
  }
};

export const _scan: ResolverFunction<ScanArg> = async (
  root,
  { cursor, type, count, match },
  ctx
): Promise<ScanResult> => {
  try {
    const buildScanArg = (cursor: number) => {
      const args: any[] = [cursor];
      if (match) args.push("MATCH", match);
      if (count) args.push("COUNT", count);
      if (type) args.push("TYPE", type);
      return args;
    };

    const mainArgs = buildScanArg(cursor);
    const [cursorResult, keysResult] = await redisClient.send_command(
      "scan",
      ...mainArgs
    );

    const scanResult: ScanResult = {
      cursor: cursorResult,
      keys: keysResult,
      _prevArgs: { cursor, type, count, match }
    };
    return scanResult;
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
