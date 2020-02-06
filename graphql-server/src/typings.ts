import { GraphQLFieldResolver } from "graphql";
import { IResolverObject } from "apollo-server";

export type ResolverFunction<T> = GraphQLFieldResolver<any, any, T>;
export type OKResp = "OK";
export type IntResp = number;
export type ErrResp = Error;
export const OK = "OK";
export type KeyValue = {
  key: string;
  value: string;
};
