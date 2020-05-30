import gql from "graphql-tag";

import { ResolverFunction } from "@typings";
import { redisClient } from "@adapters/redis";

enum ACLCommand {
  CAT = "CAT",
  DELUSER = "DELUSER",
  GENPASS = "GENPASS",
  GETUSER = "GETUSER",
  HELP = "HELP",
  LIST = "LIST",
  LOAD = "LOAD",
  LOG = "LOG",
  SAVE = "SAVE",
  SETUSER = "SETUSER",
  USERS = "USERS",
  WHOAMI = "WHOAMI",
}

enum ACLCategory {
  "keyspace",
  "read",
  "write",
  "set",
  "sortedset",
  "list",
  "hash",
  "string",
  "bitmap",
  "hyperloglog",
  "geo",
  "stream",
  "pubsub",
  "admin",
  "fast",
  "slow",
  "blocking",
  "dangerous",
  "connection",
  "transaction",
  "scripting",
}

export type ACLCatArgs = {
  categoryname: ACLCategory;
};

const _acl_cat: ResolverFunction<ACLCatArgs> = async (
  root,
  { categoryname },
  ctx
): Promise<number> => {
  console.log(root);
  try {
    const commands: string[] = [ACLCommand.CAT];
    if (categoryname) commands.push(categoryname.toString());

    console.log({ commands });
    const reply = await redisClient.send_command("ACL", commands);

    return reply;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

export const _acl = () => ({});
export const aclCommands = {
  cat: _acl_cat,
};
//       {
//   cat: _acl_cat,
// };

export const typeDefs = gql`
  # type ACLSubCommandQuery {

  #   # genpass
  #   # getuser
  #   # help
  #   # list
  #   # load
  #   # log
  #   # users
  #   # whoami
  # }

  # type ACLSubCommandMutation {
  #   # deluser
  #   # save
  #   # setuser
  # }

  enum ACLCategory {
    keyspace
    read
    write
    set
    sortedset
    list
    hash
    string
    bitmap
    hyperloglog
    geo
    stream
    pubsub
    admin
    fast
    slow
    blocking
    dangerous
    connection
    transaction
    scripting
  }

  type ACLCommands {
    """
    **ACL CAT [categoryname]**

    List the ACL categories or the commands inside a category.
    [Read more >>](https://redis.io/commands/acl-cat)
    """
    cat(categoryname: ACLCategory): [String!]
  }

  extend type Query {
    """
    **ACL SUBCOMMAND**

    [Read more >>](https://redis.io/commands#server)
    """
    _acl: ACLCommands
  }

  # extend type Mutation {
  #   """
  #   **ACL SUBCOMMAND**

  #   [Read more >>](https://redis.io/commands#server)
  #   """
  #   _acl: [ACLSubCommandMutation!]!
  # }
`;
