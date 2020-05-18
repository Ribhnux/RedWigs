import { GetStaticProps } from "next";

const CollectionPage = () => {
  return <div>bababa</div>;
};

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      scope: "event",
      page: "webhook",
    },
  };
};

export default CollectionPage;
