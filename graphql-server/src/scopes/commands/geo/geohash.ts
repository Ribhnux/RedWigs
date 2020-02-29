import gql from "graphql-tag";
import { ResolverFunction, IntResp } from "@typings";
import { redisClient } from "@adapters/redis";

export type GeoHashArgs = {
  key: string;
  members: string[];
};

export const _geohash: ResolverFunction<GeoHashArgs> = async (
  root,
  { key, members },
  ctx
): Promise<string[]> => {
  try {
    const args = [key, ...members];

    const reply = await redisClient.send_command("geohash", ...args);
    return reply;
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  extend type Query {
    """
    **GEOHASH key member [member ...]**

    Returns members of a geospatial index as standard geohash strings.
    [Read more >>](https://redis.io/commands/geohash)
    """
    _geohash(key: String!, members: [String!]!): [String]
  }
`;
