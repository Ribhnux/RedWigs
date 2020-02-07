import { gql } from "apollo-server";
import { ResolverFunction, IntResp, ErrResp } from "@typings";
import { redisClient } from "@adapters/redis";

export enum i64 {
  i0 = "i0",
  i1 = "i1",
  i2 = "i2",
  i3 = "i3",
  i4 = "i4",
  i5 = "i5",
  i6 = "i6",
  i7 = "i7",
  i8 = "i8",
  i9 = "i9",
  i10 = "i10",
  i11 = "i11",
  i12 = "i12",
  i13 = "i13",
  i14 = "i14",
  i15 = "i15",
  i16 = "i16",
  i17 = "i17",
  i18 = "i18",
  i19 = "i19",
  i20 = "i20",
  i21 = "i21",
  i22 = "i22",
  i23 = "i23",
  i24 = "i24",
  i25 = "i25",
  i26 = "i26",
  i27 = "i27",
  i28 = "i28",
  i29 = "i29",
  i30 = "i30",
  i31 = "i31",
  i32 = "i32",
  i33 = "i33",
  i34 = "i34",
  i35 = "i35",
  i36 = "i36",
  i37 = "i37",
  i38 = "i38",
  i39 = "i39",
  i40 = "i40",
  i41 = "i41",
  i42 = "i42",
  i43 = "i43",
  i44 = "i44",
  i45 = "i45",
  i46 = "i46",
  i47 = "i47",
  i48 = "i48",
  i49 = "i49",
  i50 = "i50",
  i51 = "i51",
  i52 = "i52",
  i53 = "i53",
  i54 = "i54",
  i55 = "i55",
  i56 = "i56",
  i57 = "i57",
  i58 = "i58",
  i59 = "i59",
  i60 = "i60",
  i61 = "i61",
  i62 = "i62",
  i63 = "i63",
  i64 = "i64"
}

export enum u32 {
  u0 = "u0",
  u1 = "u1",
  u2 = "u2",
  u3 = "u3",
  u4 = "u4",
  u5 = "u5",
  u6 = "u6",
  u7 = "u7",
  u8 = "u8",
  u9 = "u9",
  u10 = "u10",
  u11 = "u11",
  u12 = "u12",
  u13 = "u13",
  u14 = "u14",
  u15 = "u15",
  u16 = "u16",
  u17 = "u17",
  u18 = "u18",
  u19 = "u19",
  u20 = "u20",
  u21 = "u21",
  u22 = "u22",
  u23 = "u23",
  u24 = "u24",
  u25 = "u25",
  u26 = "u26",
  u27 = "u27",
  u28 = "u28",
  u29 = "u29",
  u30 = "u30",
  u31 = "u31",
  u32 = "u32"
}

export enum Overflow {
  WRAP = "WRAP",
  SAT = "SAT",
  FAIL = "FAIL"
}

export type BitFieldArgs = {
  key: string;
  args: {
    get?: {
      type: i64 | u32;
      offset: number;
      order: number;
    };
    set?: {
      type: i64 | u32;
      offset: number;
      value: string;
      order: number;
    };
    incrby?: {
      type: i64 | u32;
      offset: number;
      increment: number;
      order: number;
    };
    overflow?: Overflow;
  }[];
};

export const _bitfield: ResolverFunction<BitFieldArgs> = async (
  root,
  { key, args },
  ctx
): Promise<IntResp[]> => {
  try {
    const commandArgs: any[] = [key];
    const adiitionalArgs = [];
    args.forEach(({ get, set, incrby, overflow }) => {
      if (typeof get !== "undefined") {
        const { type, offset, order } = get;
        adiitionalArgs[order] = ["GET", type, offset];
      }

      if (typeof set !== "undefined") {
        const { type, offset, order, value } = set;
        adiitionalArgs[order] = ["SET", type, offset, value];
      }

      if (typeof incrby !== "undefined") {
        const { type, offset, order, increment } = incrby;
        adiitionalArgs[order] = ["INCRBY", type, offset, increment];
      }

      const overflowIndex =
        adiitionalArgs.findIndex(e => e === undefined) === -1
          ? adiitionalArgs.length
          : adiitionalArgs.findIndex(e => e === undefined);
      if (typeof overflow !== "undefined")
        adiitionalArgs[overflowIndex] = ["OVERFLOW", overflow];

      if (adiitionalArgs.length > 0) {
        commandArgs.push(...adiitionalArgs.flat());
      }
    });

    const reply = await redisClient.send_command("bitfield", ...commandArgs);
    return reply;
  } catch (err) {
    return err.message;
  }
};

export const typeDefs = gql`
  enum i64u32 {
    i0
    i1
    i2
    i3
    i4
    i5
    i6
    i7
    i8
    i9
    i10
    i11
    i12
    i13
    i14
    i15
    i16
    i17
    i18
    i19
    i20
    i21
    i22
    i23
    i24
    i25
    i26
    i27
    i28
    i29
    i30
    i31
    i32
    i33
    i34
    i35
    i36
    i37
    i38
    i39
    i40
    i41
    i42
    i43
    i44
    i45
    i46
    i47
    i48
    i49
    i50
    i51
    i52
    i53
    i54
    i55
    i56
    i57
    i58
    i59
    i60
    i61
    i62
    i63
    i64
    u0
    u1
    u2
    u3
    u4
    u5
    u6
    u7
    u8
    u9
    u10
    u11
    u12
    u13
    u14
    u15
    u16
    u17
    u18
    u19
    u20
    u21
    u22
    u23
    u24
    u25
    u26
    u27
    u28
    u29
    u30
    u31
    u32
  }

  enum Overflow {
    WRAP
    SAT
    FAIL
  }

  input BitFieldGet {
    type: i64u32!
    offset: Int!
    order: Int!
  }

  input BitFieldSet {
    type: i64u32!
    offset: String!
    value: Int!
    order: Int!
  }

  input BitFieldIncrBy {
    type: i64u32!
    offset: Int!
    increment: Int!
    order: Int!
  }

  input BitFieldArgs {
    get: BitFieldGet
    set: BitFieldSet
    incrby: BitFieldIncrBy
    overflow: Overflow
  }

  extend type Mutation {
    """
    Perform arbitrary bitfield integer operations on strings. [Read more >>](https://redis.io/commands/bitfield)
    """
    _bitfield(key: String!, args: [BitFieldArgs]): [Int]
  }
`;
