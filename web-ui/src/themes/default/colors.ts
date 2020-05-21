import { theme } from "@chakra-ui/core";
import { default as schemes } from "./schemes";

const colors = {
  ...theme.colors,
  ...schemes,
};

export default colors;
