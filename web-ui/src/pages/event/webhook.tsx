import { GetStaticProps } from "next";
import { Scope, EventPage } from "~types/scopes";

const CollectionPage = () => {
  return <div>bababa</div>;
};

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      scope: Scope.Event,
      page: EventPage.Webhook,
    },
  };
};

export default CollectionPage;
