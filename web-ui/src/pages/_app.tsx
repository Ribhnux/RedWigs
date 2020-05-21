import "graphiql/graphiql.css";
import "../../public/css/global.css";
import "../../public/css/graphiql-custom.css";
import "../../public/css/nprogress.css";

import { AppProps } from "next/app";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import defaultTheme from "themes/default";
import LayoutDefault from "layouts/default";
import Error from "next/error";
import Router from "next/router";
import NProgress from "nprogress";

Router.events.on("routeChangeStart", (url) => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const RedwigsApp = ({ Component, pageProps }: AppProps) => {
  const { page, scope, statusCode } = pageProps;
  const component = statusCode ? (
    <Error statusCode={statusCode} />
  ) : (
    <Component {...pageProps} />
  );

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <CSSReset />
        <LayoutDefault page={page} scope={scope} statusCode={statusCode ?? 404}>
          {component}
        </LayoutDefault>
      </ThemeProvider>
    </>
  );
};

export default RedwigsApp;
