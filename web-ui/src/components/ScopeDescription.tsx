import { Flex, Text } from "@chakra-ui/core";
import useGlobalThemeScheme from "hooks/global-themes";

export type ScopeDescriptionProps = {
  text: string;
};

const ScopeDescription = ({ text }) => {
  const [_, currentScheme] = useGlobalThemeScheme();
  return (
    <Flex justifyContent="flex-start" flex="2">
      <Text
        as="em"
        fontSize="sm"
        color={currentScheme.foreground}
        alignSelf="center"
        userSelect="none"
      >
        {text}
      </Text>
    </Flex>
  );
};

export default ScopeDescription;
