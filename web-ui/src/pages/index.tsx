import Head from "next/head";
import {
  Button,
  Box,
  Flex,
  IconButton,
  Divider,
  Text,
  useDisclosure,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  Input,
  Drawer,
  List,
  ListItem,
  ListIcon,
  Icon,
  Image,
} from "@chakra-ui/core";
import { useRef } from "react";
import { FaDatabase, FaPaintBrush } from "react-icons/fa";
import { MdLoop, MdApps } from "react-icons/md";
import { AiOutlineExperiment, AiOutlineFileSearch } from "react-icons/ai";
import { BsGearFill } from "react-icons/bs";
import { GiStack } from "react-icons/gi";
import { FiLink } from "react-icons/fi";
import dynamic from "next/dynamic";

const GraphiQL = dynamic<{
  fetcher: any;
  editorTheme: string;
  docExplorerOpen: boolean;
  defaultQuery: string;
}>(() => import("graphiql"), {
  ssr: false,
});

function graphQLFetcher(graphQLParams) {
  return fetch(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(graphQLParams),
  }).then((response) => response.json());
}

export default function Home() {
  const switchModeButton = useRef();
  const defaultQuery = `
  query{test:_get(key:"test")}
  `;

  return (
    <>
      <Head>
        <title>RedWigs Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex flexDir="column" flex={1}>
        <Flex justifyContent="right" flexDir="row-reverse" p={2} bg="black">
          <Flex>
            <Text fontSize="md" alignSelf="center" color="red.400">
              <Box
                as={FaDatabase}
                size="3"
                verticalAlign="initial"
                display="inline"
              />{" "}
              Data
            </Text>
            <Divider borderColor="gray.600" orientation="vertical" />
            <Text fontSize="md" alignSelf="center">
              <Box
                as={MdLoop}
                size="3"
                verticalAlign="initial"
                display="inline"
              />{" "}
              Event
            </Text>
            <Divider borderColor="gray.600" orientation="vertical" />
            <Text fontSize="md" alignSelf="center">
              <Box
                as={MdApps}
                size="3"
                verticalAlign="initial"
                display="inline"
              />{" "}
              AppFn
            </Text>
            <Divider borderColor="gray.600" orientation="vertical" />
            <Text fontSize="md" alignSelf="center">
              <Box
                as={BsGearFill}
                size="3"
                verticalAlign="initial"
                display="inline"
              />{" "}
              Machine
            </Text>
            <Divider borderColor="gray.600" orientation="vertical" />
            <Text fontSize="md" alignSelf="center">
              <Box
                as={FaPaintBrush}
                size="3"
                verticalAlign="initial"
                display="inline"
              />{" "}
              Prototype
            </Text>
          </Flex>
        </Flex>
        <Flex justifyContent="space-between" bg="gray.900">
          <Flex>
            <Box size="xs" width="50px" height="50px">
              <Image src="/logo_transparent.png" alt="Redwigs" />
            </Box>
            <Divider orientation="vertical" borderColor="gray.600" />
          </Flex>

          <Flex flexDir="column" justifyContent="center">
            <Flex>
              <Text fontSize="md" alignSelf="center" mr={2} color="red.400">
                <Box as={AiOutlineExperiment} display="inline" /> GraphiQL
              </Text>
              <Divider borderColor="gray.600" orientation="vertical" />
              <Text fontSize="md" alignSelf="center" mr={3} ml={3}>
                <Box as={GiStack} display="inline" /> Collections
              </Text>
              <Divider borderColor="gray.600" orientation="vertical" />
              <Text fontSize="md" alignSelf="center" mr={3} ml={3}>
                <Box as={AiOutlineFileSearch} display="inline" /> Browse
              </Text>
              <Divider borderColor="gray.600" orientation="vertical" />
              <Text fontSize="md" alignSelf="center" mr={3} ml={3}>
                <Icon name="rest" /> REST
              </Text>
              <Divider borderColor="gray.600" orientation="vertical" />
              <Text fontSize="md" alignSelf="center" mr={3} ml={3}>
                <Icon name="grpc" /> gRPC
              </Text>
            </Flex>
          </Flex>
          <Flex>
            <IconButton
              size="sm"
              variant="outline"
              variantColor="teal"
              aria-label="Send email"
              icon="question"
            />
          </Flex>
        </Flex>
        <Flex flex={1}>
          {"aa" && (
            <GraphiQL
              fetcher={graphQLFetcher}
              defaultQuery={defaultQuery}
              editorTheme="material-ocean"
              docExplorerOpen={true}
            />
          )}
        </Flex>
      </Flex>
    </>
  );
}
