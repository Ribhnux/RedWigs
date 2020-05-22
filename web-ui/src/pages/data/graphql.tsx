import Head from "next/head";
import dynamic from "next/dynamic";
import { graphQLFetcher } from "utils/fetcher";
import { GetStaticProps } from "next";
import {
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  useTheme,
} from "@chakra-ui/core";
import { Scope, DataPage } from "~types/scopes";
import useGlobalThemeScheme from "hooks/global-themes";
import { themeGraphQLSchemeMap } from "fixtures/theme";

const graphiQLPage = () => {
  const [schemeName, currentScheme] = useGlobalThemeScheme();
  const defaultQuery = `
    query{test:_get(key:"test")}
  `;
  const editorTheme = themeGraphQLSchemeMap[schemeName];
  const GraphiQL = dynamic<{
    fetcher: any;
    editorTheme: string;
    docExplorerOpen: boolean;
    defaultQuery: string;
  }>((): Promise<any> => import("graphiql"), {
    loading: () => <p>...</p>,
    ssr: false,
  });

  return (
    <>
      <Flex flex={1}>
        <Flex width="15rem">Header Options</Flex>
        <Flex
          flex={1}
          borderLeftWidth={1}
          borderLeftColor={currentScheme.border}
        >
          <GraphiQL
            fetcher={graphQLFetcher}
            defaultQuery={defaultQuery}
            editorTheme={editorTheme}
            docExplorerOpen={true}
          />
        </Flex>
      </Flex>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      scope: Scope.Data,
      page: DataPage.GraphQL,
    },
  };
};

export default graphiQLPage;
