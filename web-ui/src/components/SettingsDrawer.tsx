import {
  Drawer,
  useDisclosure,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Input,
  DrawerFooter,
  Icon,
  Flex,
  Divider,
  Box,
  SimpleGrid,
  Radio,
} from "@chakra-ui/core";
import { MutableRefObject } from "react";
import { Scheme } from "~types/themes";
import { startCase } from "lodash";
import { Scrollbars } from "react-custom-scrollbars";

import useGlobalThemeScheme from "hooks/global-themes";

const IconSettings = () => <Flex flex={1}>a</Flex>;

const FontSettings = () => {
  return (
    <Flex flex={1}>
      <Box>Font Pairs:</Box>
    </Flex>
  );
};

export type ThemeSchemeProps = {
  scheme: Scheme;
};

const ThemeScheme = ({ scheme = Scheme.Darker }: ThemeSchemeProps) => {
  const [currentScheme, _, switchScheme] = useGlobalThemeScheme();
  const schemeProperName = startCase(scheme);
  const isChecked = scheme === currentScheme;

  return (
    <Box
      backgroundColor={`${scheme}.background`}
      borderWidth={2}
      borderColor={`${scheme}.border`}
      as={Flex}
      color={`${scheme}.text`}
      flexDirection="column"
      cursor="pointer"
      borderRadius={10}
      onClick={() => switchScheme(scheme)}
    >
      <Box
        as={Flex}
        flexDirection="column"
        height="8rem"
        borderBottomWidth={2}
        borderColor={`${scheme}.border`}
        userSelect="none"
      >
        <Flex
          backgroundColor={`${scheme}.background`}
          justifyContent="flex-end"
          fontSize="9px"
          borderRadius={10}
        >
          <Box mx={2} color={`${scheme}.functionsColor`}>
            Data
          </Box>
          <Box mx={2}>Event</Box>
          <Box mx={2}>...</Box>
        </Flex>
        <Flex
          backgroundColor={`${scheme}.secondBackground`}
          justifyContent="center"
          fontSize="10px"
        >
          <Box mx={2} color={`${scheme}.linksColor`}>
            GraphQL
          </Box>
          <Box mx={2}>Collections</Box>
          <Box mx={2}>...</Box>
        </Flex>
      </Box>
      <Box p={3}>
        <Radio
          size="md"
          name="1"
          variantColor={`${scheme}Tree`}
          isChecked={isChecked}
          onChange={() => {}}
        >
          {schemeProperName}
        </Radio>
      </Box>
    </Box>
  );
};

const ThemeList = () => (
  <>
    {Object.keys(Scheme).map((schemeName, key) => (
      <ThemeScheme key={key} scheme={Scheme[schemeName]} />
    ))}
  </>
);

const ThemeSettings = () => {
  const [_, currentScheme] = useGlobalThemeScheme();

  return (
    <Flex
      flex={2}
      height="3rem"
      flexDirection="column"
      color={currentScheme.text}
    >
      <Box>Choose theme color:</Box>
      <Flex
        flexWrap="wrap"
        p={2}
        pt={0}
        pr={0}
        flex={1}
        height="3rem"
        borderColor={currentScheme.border}
        bg={currentScheme.secondBackground}
        borderWidth={1}
      >
        <Scrollbars style={{ height: "100%" }}>
          <SimpleGrid columns={2} spacing={3} flex={1} p={4} pl={0}>
            <ThemeList />
          </SimpleGrid>
        </Scrollbars>
      </Flex>
    </Flex>
  );
};

const SettingsWrapper = ({ children }) => (
  <Flex flexDirection="column" justifyContent="space-between" height="100%">
    {children}
  </Flex>
);

export type SettingsDrawerProps = {
  btnRef: MutableRefObject<any>;
  isOpen: boolean;
  onClose: () => void;
};

const SettingsDrawer = ({ btnRef, isOpen, onClose }: SettingsDrawerProps) => {
  const [_, currentScheme] = useGlobalThemeScheme();
  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef}
      size="md"
    >
      <DrawerOverlay />
      <DrawerContent
        borderColor={currentScheme.border}
        bg={currentScheme.background}
      >
        <DrawerCloseButton />
        <DrawerHeader color={currentScheme.text}>
          <Icon name="settings" /> Settings
        </DrawerHeader>

        <DrawerBody>
          <SettingsWrapper>
            <ThemeSettings />
            <Divider borderColor={currentScheme.border} />
            <FontSettings />
            <Divider borderColor={currentScheme.border} />
            <IconSettings />
          </SettingsWrapper>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default SettingsDrawer;
