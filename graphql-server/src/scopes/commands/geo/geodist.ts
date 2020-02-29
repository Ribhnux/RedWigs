import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";

export enum GeoUnit {
  Meter = "m",
  Kilometer = "km",
  Feet = "ft",
  Mile = "mi"
}

export type GeoDistArgs = {
  key: string;
  members: string[];
  unit?: GeoUnit;
};

export const _geodist: ResolverFunction<GeoDistArgs> = async (
  root,
  { key, members, unit },
  ctx
): Promise<IntResp> => {
  try {
    const args = [key, ...members];
    if (unit) args.push(GeoUnit[unit]);

    const reply = await redisClient.send_command("geodist", ...args);
    return reply;
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  enum GeoUnit {
    Meter
    Kilometer
    Feet
    Mile
  }

  extend type Query {
    """
    **GEODIST key member1 member2 [m|km|ft|mi]**

    Returns the distance between two members of a geospatial index
    [Read more >>](https://redis.io/commands/geodist)
    """
    _geodist(key: String!, members: [String!]!, unit: GeoUnit): String
  }
`;
