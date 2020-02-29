import gql from "graphql-tag";
import { ResolverFunction } from "@typings";
import { redisClient } from "@adapters/redis";
import { GeoUnit } from "./geodist";
import { GeoRadiusData, makeGeoRadiusData, GeoRadiusOrder } from "./georadius";

export type GeoRadiusByMemberArgs = {
  key: string;
  member: string;
  radius: number;
  unit: GeoUnit;
  with_coordinate?: boolean;
  with_distance?: boolean;
  with_hash?: boolean;
  count?: number;
  order?: GeoRadiusOrder;
  store?: string;
  store_dist?: string;
};

export const _georadiusbymember: ResolverFunction<GeoRadiusByMemberArgs> = async (
  root,
  args,
  ctx
): Promise<any> => {
  const {
    key,
    member,
    radius,
    unit,
    with_coordinate,
    with_distance,
    with_hash,
    count,
    order,
    store,
    store_dist
  } = args;

  try {
    const args = [key, member, radius, GeoUnit[unit]];
    if (with_coordinate === true) args.push("WITHCOORD");
    if (with_distance === true) args.push("WITHDIST");
    if (with_hash === true) args.push("WITHHASH");
    if (count) args.push("COUNT", count);
    if (order) args.push(order);
    if (store) args.push("STORE", store);
    if (store_dist) args.push("STOREDIST", store_dist);

    const reply = await redisClient.send_command("georadiusbymember", ...args);
    const isWithOption =
      with_coordinate === true || with_distance === true || with_hash === true;

    const result: GeoRadiusData | JSON = isWithOption
      ? makeGeoRadiusData(reply, { with_coordinate, with_distance, with_hash })
      : reply;

    return result;
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  extend type Query {
    """
    **GEORADIUSBYMEMBER key member radius m|km|ft|mi [WITHCOORD] [WITHDIST] [WITHHASH] [COUNT count] [ASC|DESC] [STORE key] [STOREDIST key]**

    Query a sorted set representing a geospatial index to fetch members
    matching a given maximum distance from a member.
    [Read more >>](https://redis.io/commands/georadiusbymember)
    """
    _georadiusbymember(
      key: String!
      member: String!
      radius: Float!
      unit: GeoUnit!
      with_coordinate: Boolean
      with_distance: Boolean
      with_hash: Boolean
      count: Int
      order: GeoRadiusOrder
      store: String
      store_dist: String
    ): JSON
  }
`;
