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
  FlexProps,
  useTheme,
} from "@chakra-ui/core";
import { FaDatabase } from "react-icons/fa";
import useGlobalThemeScheme from "hooks/global-themes";
import { ThemeSchemeColors } from "~types/themes";

const PaneTitle = ({ children }) => {
  const [_, currentThemeScheme] = useGlobalThemeScheme();
  return (
    <Flex
      p={2}
      bg={currentThemeScheme.selectionBackground}
      color={currentThemeScheme.selectionForeground}
      borderColor={currentThemeScheme.border}
      borderBottomWidth={1}
      fontWeight="500"
    >
      {children}
    </Flex>
  );
};

const PaneContent: React.FC<FlexProps> = ({ children, ...props }) => {
  const [_, currentThemeScheme] = useGlobalThemeScheme();
  return (
    <Flex p={2} {...props} bg={currentThemeScheme.secondBackground} flex={1}>
      {children}
    </Flex>
  );
};

const PaneWrapper: React.FC<FlexProps> = ({ children, ...props }) => {
  const [schemeName, currentThemeScheme] = useGlobalThemeScheme();
  const { colors } = useTheme();
  const colorsScheme = colors[schemeName] as ThemeSchemeColors;
  return (
    <Flex
      mr={2}
      borderColor={currentThemeScheme.border}
      borderWidth={1}
      borderTopWidth={0}
      backgroundColor={currentThemeScheme.secondBackground}
      {...props}
      flexDirection="column"
      boxShadow={`1px 1px 10px ${colorsScheme.border}`}
    >
      {children}
    </Flex>
  );
};

const CollectionsWrapper = ({ children }) => {
  const [_, currentThemeScheme] = useGlobalThemeScheme();
  console.log(currentThemeScheme);

  return (
    <Flex justifyContent="flex-start" flex={1}>
      <PaneWrapper>
        <PaneTitle>Database</PaneTitle>
        <PaneContent>
          <List spacing={2}>
            <ListItem>
              <ListIcon
                icon={FaDatabase}
                color={currentThemeScheme.foreground}
              />{" "}
              0
            </ListItem>
            <ListItem>
              <ListIcon
                icon={FaDatabase}
                color={currentThemeScheme.foreground}
              />{" "}
              1
            </ListItem>
            <ListItem>
              <ListIcon
                icon={FaDatabase}
                color={currentThemeScheme.foreground}
              />{" "}
              2
            </ListItem>
            <ListItem>
              <ListIcon
                icon={FaDatabase}
                color={currentThemeScheme.foreground}
              />{" "}
              3
            </ListItem>
          </List>
        </PaneContent>
      </PaneWrapper>
      <PaneWrapper width="15rem">
        <PaneTitle>Schemas</PaneTitle>
        <PaneContent>empty schema</PaneContent>
      </PaneWrapper>
      <PaneWrapper width="15rem">
        <PaneTitle>Collections</PaneTitle>
        <Flex p={2}>empty collection</Flex>
      </PaneWrapper>
      <PaneWrapper flex={1} mr={0}>
        <PaneTitle>
          <Breadcrumb
            separator={
              <Icon
                color={currentThemeScheme.selectionForeground}
                name="chevron-right"
              />
            }
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
        </PaneTitle>
        <PaneContent p={5}>{children}</PaneContent>
      </PaneWrapper>
    </Flex>
  );
};

export default CollectionsWrapper;
