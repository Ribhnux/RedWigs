import { Flex, Divider, Image, Text } from "@chakra-ui/core";
import Head from "next/head";

export const MainWrapper = ({ children }) => (
  <Flex flexDir="column" flex={1}>
    {children}
  </Flex>
);

export const TopNavWrapper = ({ children }) => (
  <Flex justifyContent="right" flexDir="row-reverse" p={2} bg="black">
    <Flex justifyContent="center">{children}</Flex>
  </Flex>
);

export const NavWrapper = ({ children }) => (
  <Flex justifyContent="space-between" bg="gray.900">
    {children}
  </Flex>
);

export const MainNavWrapper = ({ children }) => (
  <Flex flexDir="column" justifyContent="center" flex={3}>
    <Flex>{children}</Flex>
  </Flex>
);

export const LogoWrapper = ({ children }) => (
  <Flex width="5rem">
    {children}
    <Divider orientation="vertical" borderColor="gray.600" />
  </Flex>
);

export const HelperWrapper = ({ children }) => <Flex>{children}</Flex>;

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
