import gql from "graphql-tag";
import zipObject from "lodash/zipObject";
import { ResolverFunction } from "@typings";
import { redisClient } from "@adapters/redis";

export type GeoPosArgs = {
  key: string;
  members: string[];
};

export const _geopos: ResolverFunction<GeoPosArgs> = async (
  root,
  { key, members },
  ctx
): Promise<any> => {
  try {
    const args = [key, ...members];

    const reply: any[] = await redisClient.send_command("geopos", ...args);
    const result = zipObject(
      members,
      reply.map((coordinate: string[] | null) =>
        coordinate
          ? {
              x: parseFloat(coordinate[0]),
              y: parseFloat(coordinate[1])
            }
          : null
      )
    );

    return result;
  } catch (err) {
    throw new Error(err);
  }
};

export const typeDefs = gql`
  extend type Query {
    """
    **GEOPOS key member [member ...]**

    Returns longitude and latitude of members of a geospatial index.
    [Read more >>](https://redis.io/commands/geopos)
    """
    _geopos(key: String!, members: [String!]!): JSON
  }
`;
