import { GraphQLScalarType, Kind } from "graphql";

export const OKScalar = new GraphQLScalarType({
  name: "OK",
  description: "RESP Simple Strings Scalar Type",
  parseValue: value => "OK",
  serialize: value => "OK",
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return "OK";
    }
    return null;
  }
});

export const RespIntScalar = new GraphQLScalarType({
  name: "RESPIntegers",
  description: "RESP Integers Scalar Type",
  parseValue: value => parseInt(value, 10),
  serialize: value => parseInt(value.toString(), 10),
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING || ast.kind === Kind.FLOAT) {
      return parseInt(ast.value, 10);
    }
    return null;
  }
});

export const RespBulkScalar = new GraphQLScalarType({
  name: "RespBulk",
  description: "RESP Bulk Strings",
  parseValue: value => value.toString(),
  serialize: value => value.toString(),
  parseLiteral(ast) {
    if (
      ast.kind === Kind.FLOAT ||
      ast.kind === Kind.INT ||
      ast.kind === Kind.BOOLEAN
    ) {
      return ast.value.toString();
    }

    return null;
  }
});
