import { theme, ITheme } from "@chakra-ui/core";
import colors from "./colors";
import customIcons from "./icons";

const defaultTheme: ITheme = {
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
