import { typeDefs as echoTypeDefs, _echo } from "./echo";
import { typeDefs as pingTypeDefs, _ping } from "./ping";
import { typeDefs as quitTypeDefs, _quit } from "./quit";
import { typeDefs as selectTypeDefs, _select } from "./select";
import { typeDefs as swapDBTypeDefs, _swapdb } from "./swapdb";

export const typeDefs = [
  echoTypeDefs,
  pingTypeDefs,
  quitTypeDefs,
  selectTypeDefs,
  swapDBTypeDefs
];

export const resolvers = {
  query: { _echo, _ping },
  mutation: { _quit, _select, _swapdb },
  subscription: {},
  types: {}
};
