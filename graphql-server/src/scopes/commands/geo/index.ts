import { typeDefs as geoaddTypeDefs, _geoadd } from "./geoadd";
import { typeDefs as geodistTypeDefs, _geodist } from "./geodist";
import { typeDefs as geohashTypeDefs, _geohash } from "./geohash";
import { typeDefs as geoposTypeDefs, _geopos } from "./geopos";
import { typeDefs as georadiusTypeDefs, _georadius } from "./georadius";
import {
  typeDefs as georadiusByMemberTypeDefs,
  _georadiusbymember
} from "./georadiusbymember";

export const typeDefs = [
  geoaddTypeDefs,
  geodistTypeDefs,
  geohashTypeDefs,
  geoposTypeDefs,
  georadiusByMemberTypeDefs,
  georadiusTypeDefs
];

export const resolvers = {
  Query: { _geodist, _georadius, _geohash, _geopos, _georadiusbymember },
  Mutation: { _geoadd },
  Subscription: {}
};
