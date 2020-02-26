import {
  DocumentNode,
  OperationDefinitionNode,
  FieldNode,
  ListValueNode,
  StringValueNode
} from "graphql";
import gql from "graphql-tag";

export const getChannelNamesFromQuery = (
  query: string | DocumentNode,
  variables: any
) => {
  const queryNode: DocumentNode = gql`
    ${query}
  `;

  const [firstDefinition] = queryNode.definitions;
  const subscription = firstDefinition as OperationDefinitionNode;
  const { operation } = subscription;

  if (operation !== "subscription") {
    return [];
  }

  if (subscription.variableDefinitions.length > 0) {
    const {
      variableDefinitions: [channelsArg]
    } = subscription;
    const channelsVariableName = channelsArg.variable.name.value;
    const channelNames = variables[channelsVariableName];
    return channelNames;
  }

  const [firstField] = subscription.selectionSet.selections;
  const subscriptionField = firstField as FieldNode;
  const [firstArgument] = subscriptionField.arguments;
  const argumentList = firstArgument.value as ListValueNode;
  const channelNames = argumentList.values.map((v: StringValueNode) => v.value);

  return channelNames;
};
