import gql from "graphql-tag";
import last from "lodash/last";
import first from "lodash/first";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";
import { GeoUnit } from "./geodist";

export enum GeoRadiusOrder {
  ASC = "ASC",
  DESC = "DESC"
}

export type GeoRadiusData = {
  name: any;
  distance?: number;
  hash?: number;
  coordinate?: {
    x: number;
    y: number;
  };
};

export const makeGeoRadiusData = (
  reply: any[],
  opts: {
    with_coordinate?: boolean;
    with_distance?: boolean;
    with_hash?: boolean;
  }
) =>
  reply.map(
    ([name, ...withdata]: any[]): GeoRadiusData => {
      const hashIndex = opts.with_distance === true ? 1 : 0;

      const data: GeoRadiusData = { name };
      if (opts.with_distance === true) data.distance = first(withdata);
      if (opts.with_hash) data.hash = withdata[hashIndex];
      if (opts.with_coordinate === true) {
        const [x, y]: [string, string] = last(withdata);
        data.coordinate = {
          x: parseFloat(x),
          y: parseFloat(y)
        };
      }

      return data;
    }
  );

export type GeoRadiusArgs = {
  key: string;
  longitude: number;
  latitude: number;
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

export const _georadius: ResolverFunction<GeoRadiusArgs> = async (
  root,
  args,
  ctx
): Promise<any> => {
  const {
    key,
    longitude,
    latitude,
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
    const args = [key, longitude, latitude, radius, GeoUnit[unit]];
    if (with_coordinate === true) args.push("WITHCOORD");
    if (with_distance === true) args.push("WITHDIST");
    if (with_hash === true) args.push("WITHHASH");
    if (count) args.push("COUNT", count);
    if (order) args.push(order);
    if (store) args.push("STORE", store);
    if (store_dist) args.push("STOREDIST", store_dist);

    const reply = await redisClient.send_command("georadius", ...args);
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
  enum GeoRadiusOrder {
    ASC
    DESC
  }

  extend type Query {
    """
    **GEORADIUS key longitude latitude radius m|km|ft|mi [WITHCOORD] [WITHDIST] [WITHHASH] [COUNT count] [ASC|DESC] [STORE key] [STOREDIST key]**

    Query a sorted set representing a geospatial index to fetch members
    matching a given maximum distance from a point.
    [Read more >>](https://redis.io/commands/georadius)
    """
    _georadius(
      key: String!
      longitude: Float!
      latitude: Float!
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
