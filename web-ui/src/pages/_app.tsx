import "graphiql/graphiql.css";
import "codemirror/theme/material-ocean.css";
import "../../public/css/global.css";
import "../../public/css/graphiql-custom.css";

import { AppProps } from "next/app";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import defaultTheme from "themes/default";

const RedwigsApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CSSReset />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default RedwigsApp;
