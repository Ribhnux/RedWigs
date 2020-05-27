import GraphiQLWrapper from "./wrappers/data/GraphiQLWrapper";
import CollectionsWrapper from "./wrappers/data/CollectionsWrapper";

export type LayoutWrapperProps = {
  scope: string;
  page: string;
};

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({
  children,
  scope,
  page,
}) => {
  if (scope === "data") {
    switch (page) {
      case "graphiql":
        return <GraphiQLWrapper>{children}</GraphiQLWrapper>;
      case "collections":
        return <CollectionsWrapper>{children}</CollectionsWrapper>;
      default:
        return <>{children}</>;
    }
  }

  if (scope === "event") {
    return <>{children}</>;
  }

  if (scope === "app-fn") {
    return <>{children}</>;
  }

  if (scope === "state-machine") {
    return <>{children}</>;
  }

  if (scope === "components") {
    return <>{children}</>;
  }

  return <>{children}</>;
};

export default LayoutWrapper;
