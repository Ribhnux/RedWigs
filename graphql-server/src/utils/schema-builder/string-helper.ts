import _ from 'lodash';

export const upperFirstCamelCase = (s: string) =>
  _.chain(s)
    .camelCase()
    .upperFirst()
    .value();
