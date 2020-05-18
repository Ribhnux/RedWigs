import { Flex, Text } from "@chakra-ui/core";

export type ScopeDescriptionProps = {
  text: string;
};

const ScopeDescription = ({ text }) => (
  <Flex justifyContent="flex-start" flex="2">
    <Text
      as="em"
      fontSize="sm"
      color="gray.400"
      alignSelf="center"
      userSelect="none"
    >
      {text}
    </Text>
  </Flex>
);

export default ScopeDescription;
