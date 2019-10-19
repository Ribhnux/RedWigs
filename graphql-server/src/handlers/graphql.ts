import { Request, Response } from 'express';

export const graphQLHTTPHandler = async (
  req: Request,
  res: Response,
  graphQLParams
) => ({
  schema: global['graphqlSchema'],
  graphiql: false
});
