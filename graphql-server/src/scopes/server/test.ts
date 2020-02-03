import gql from "graphql-tag";
import { ResolverFunction } from "typings";

export type ReplyTest = {
  message: string;
  serverDate: string;
};

export type TestArgs = {
  data: string;
};

const _test: ResolverFunction<TestArgs> = (root, { data }, ctx): ReplyTest => {
  return {
    message: `Work as expected with data ${data}`,
    serverDate: new Date().toJSON()
  };
};

export const schema = gql`
  "ReplyTest is a response for test mutation"
  type ReplyTest {
    """
    Dummy server message
    """
    message: String
    """
    Current server date
    """
    serverDate: String
  }
`;

export default _test;
