import _ from "lodash";
import { parseJSONOrKeep } from "./json";

export const transformPairToParsedJSON = ([key, value]) => ({
  [key]: parseJSONOrKeep(value)
});

export const arrayToObjectNull = (result: any, value: string, key: number) => {
  result[value] = null;
};

export const parseValueToJSONTransformer = (
  result: any,
  value: any,
  key: string
) => {
  result[key] = parseJSONOrKeep(value);
};

export const transformMerge = <T, U>(
  array: any[],
  pairChunk: number,
  callbackfn: (value: T, index: number, array: T[]) => U
) => {
  return _.merge(
    {},
    ..._.chain(array)
      .chunk(pairChunk)
      .map(callbackfn)
      .value()
  );
};
