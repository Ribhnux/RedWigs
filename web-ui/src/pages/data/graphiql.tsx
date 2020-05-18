import Head from "next/head";
import dynamic from "next/dynamic";
import { graphQLFetcher } from "utils/fetcher";
import { GetStaticProps } from "next";

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
      {<div>null</div> && (
        <GraphiQL
          fetcher={graphQLFetcher}
          defaultQuery={defaultQuery}
          editorTheme="material-ocean"
          docExplorerOpen={true}
        />
      )}
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      scope: "data",
      page: "graphiql",
    },
  };
};

export default graphiQLPage;
