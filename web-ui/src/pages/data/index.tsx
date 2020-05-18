import { GetServerSideProps } from "next";

export default () => null;
export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.writeHead(302, {
    Location: "/data/graphiql",
  });
  res.end();

  return { props: {} };
};
