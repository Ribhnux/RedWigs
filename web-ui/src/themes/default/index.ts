import { theme } from "@chakra-ui/core";
import colors from "./colors";
import customIcons from "./icons";

const defaultTheme = {
  ...theme,
  colors: {
    ...colors,
  },
  icons: {
    ...theme.icons,
    ...customIcons,
  },
};

export default defaultTheme;
