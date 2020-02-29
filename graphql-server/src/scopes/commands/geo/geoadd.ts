import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";
import { convertToJSONOrKeep } from "@utils/json";

export type GeoData = {
  longitude: number;
  latitude: number;
  member: any;
};

export type GeoAddArgs = {
  key: string;
  data: GeoData[];
};

export const _geoadd: ResolverFunction<GeoAddArgs> = async (
  root,
  { key, data },
  ctx
): Promise<IntResp> => {
  try {
    const args = data
      .map(({ longitude, latitude, member }: GeoData) => ({
        longitude,
        latitude,
        member: convertToJSONOrKeep(member)
      }))
      .map(({ longitude, latitude, member }: GeoData) => [
        longitude,
        latitude,
        member
      ])
      .flat();

    const reply = await redisClient.send_command("geoadd", key, ...args);
    return reply;
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  input GeoData {
    longitude: Float!
    latitude: Float!
    member: JSON
  }

  extend type Mutation {
    """
    Add one or more geospatial items in the geospatial index represented using a sorted set.
    [Read more >>](https://redis.io/commands/geoadd)
    """
    _geoadd(key: String!, data: [GeoData!]!): Int
  }
`;
