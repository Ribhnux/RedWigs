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
} from "@chakra-ui/core";
import { topNavLinks } from "fixtures/navigation";
import { Scope, DataPage } from "~types/scopes";

const GraphiQL = dynamic<{
  fetcher: any;
  editorTheme: string;
  docExplorerOpen: boolean;
  defaultQuery: string;
}>((): Promise<any> => import("graphiql"), {
  ssr: false,
});

const graphiQLPage = () => {
  const defaultQuery = `
  query{test:_get(key:"test")}
`;

  return (
    <>
      <Head>
        <link />
      </Head>
      <Flex flex={1}>
        <Flex width="15rem">
          <Menu>
            <MenuButton as={Button}>Actions</MenuButton>
            <MenuList>
              <MenuItem>Download</MenuItem>
              <MenuItem>Create a Copy</MenuItem>
              <MenuItem>Mark as Draft</MenuItem>
              <MenuItem>Delete</MenuItem>
              <MenuItem as="a">Attend a Workshop</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        <Flex flex={1}>
          ppp
          {/* <GraphiQL
            fetcher={graphQLFetcher}
            defaultQuery={defaultQuery}
            editorTheme="material-ocean"
            docExplorerOpen={true}
          /> */}
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
