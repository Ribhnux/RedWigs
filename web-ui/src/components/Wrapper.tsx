import { Flex, Divider, Image, Text } from "@chakra-ui/core";
import Head from "next/head";
import useGlobalThemeScheme from "hooks/global-themes";

export const MainWrapper = ({ children }) => (
  <Flex flexDir="column" flex={1}>
    {children}
  </Flex>
);

export const TopNavWrapper = ({ children }) => {
  const [_, currentScheme] = useGlobalThemeScheme();
  return (
    <Flex
      justifyContent="right"
      flexDir="row-reverse"
      p={2}
      bg={currentScheme.background}
      borderBottomWidth="1px"
      borderBottomColor={currentScheme.border}
    >
      <Flex justifyContent="center">{children}</Flex>
    </Flex>
  );
};

export const NavWrapper = ({ children }) => {
  const [_, currentScheme] = useGlobalThemeScheme();
  return (
    <Flex
      justifyContent="space-between"
      bg={currentScheme.secondBackground}
      borderBottomColor={currentScheme.border}
      borderBottomWidth="1px"
      zIndex={999}
    >
      {children}
    </Flex>
  );
};

export const MainNavWrapper = ({ children }) => (
  <Flex flexDir="column" justifyContent="center" flex={3}>
    <Flex>{children}</Flex>
  </Flex>
);

export const VerticalDivider = () => {
  const [_, currentScheme] = useGlobalThemeScheme();
  return <Divider orientation="vertical" borderColor={currentScheme.border} />;
};

export const LogoWrapper = ({ children }) => (
  <Flex width="5rem">
    {children}
    <VerticalDivider />
  </Flex>
);

export const HelperWrapper = ({ children }) => <Flex p={2}>{children}</Flex>;

export const PageWrapper = ({ children }) => (
  <Flex flex={1} justifyContent="center">
    {children}
  </Flex>
);

export const ErrorPageWrapper = ({ title, message }) => (
  <>
    <Head>
      <title>{title}</title>
    </Head>
    <Flex
      alignSelf="center"
      flex="1"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
    >
      <Image src="/images/logo.png" size="20rem" />
      <Text fontSize="4xl">{message}</Text>
    </Flex>
  </>
);
