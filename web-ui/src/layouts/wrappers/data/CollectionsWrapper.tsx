import {
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  List,
  ListItem,
  ListIcon,
  Icon,
  Link,
} from "@chakra-ui/core";
import { FaDatabase } from "react-icons/fa";

const CollectionsWrapper = ({ children }) => {
  return (
    <Flex justifyContent="flex-start" flex={1}>
      <Flex
        width="5rem"
        mr={2}
        backgroundColor="gray.900"
        flexDirection="column"
        boxShadow="1px 1px 10px #000"
      >
        <Flex p={2} bg="black">
          Database
        </Flex>
        <Flex p={2}>
          <List spacing={2}>
            <ListItem>
              <ListIcon icon={FaDatabase} color="gray.500" /> 0
            </ListItem>
            <ListItem>
              <ListIcon icon={FaDatabase} color="gray.500" /> 1
            </ListItem>
            <ListItem>
              <ListIcon icon={FaDatabase} color="gray.500" /> 2
            </ListItem>
            <ListItem>
              <ListIcon icon={FaDatabase} color="gray.500" /> 3
            </ListItem>
          </List>
        </Flex>
      </Flex>
      <Flex
        width="15rem"
        mr={2}
        backgroundColor="gray.900"
        flexDirection="column"
        boxShadow="1px 1px 10px #000, -1px -1px 10px #000"
      >
        <Flex p={2} bg="black">
          Schemas
        </Flex>
        <Flex p={2}>empty schema</Flex>
      </Flex>
      <Flex
        width="15rem"
        backgroundColor="gray.900"
        mr={2}
        flexDirection="column"
        boxShadow="1px 1px 10px #000, -1px -1px 10px #000"
      >
        <Flex p={2} bg="black">
          Collections
        </Flex>
        <Flex p={2}>empty collection</Flex>
      </Flex>
      <Flex
        flex={1}
        flexDirection="column"
        backgroundColor="gray.800"
        borderLeftColor="black"
        borderLeftWidth="1px"
        boxShadow="1px 1px 10px #000, -1px -1px 10px #000"
      >
        <Flex
          p={2}
          bg="black"
          fontSize="1rem"
          borderBottomWidth="1px"
          borderBottomColor="black"
        >
          <Breadcrumb
            separator={<Icon color="gray.300" name="chevron-right" />}
          >
            <BreadcrumbItem>
              <BreadcrumbLink href="/data/collections/0">DB #0</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink href="/data/collections/0/schema">
                My Schema
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink href="/data/collections/0/schema/books">
                Books
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink>Browse</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Flex>
        <Flex p={2}>{children}</Flex>
      </Flex>
    </Flex>
  );
};

export default CollectionsWrapper;
