import _ from "lodash";

export const parseJSONOrKeep = (value: any): JSON | any => {
  try {
    const json = JSON.parse(value);
    return json;
  } catch {
    return value;
  }
};

export const convertToJSONOrKeep = (data: any): string | any =>
  typeof data === "object" ? JSON.stringify(data) : data;

export const toMixedJSON = (object: any) => (key: number) => ({
  [key]: parseJSONOrKeep(object[key])
});

export const mapToDeepJSON = (map: any) => {
  const arrayOfJSON = _.chain(map)
    .keys()
    .map(toMixedJSON(map))
    .value();

  return _.merge({}, ...arrayOfJSON);
};
