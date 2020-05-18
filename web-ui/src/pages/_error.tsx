import { ErrorPageWrapper } from "components/Wrapper";

function ErrorPage({ statusCode }) {
  const text = statusCode
    ? `${statusCode} occurred on server`
    : "An error occured";

  return <ErrorPageWrapper title={text} message={text} />;
}

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;
