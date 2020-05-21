import Head from "next/head";
import { IconButton, useDisclosure, useTheme } from "@chakra-ui/core";
import ScopeDescription from "components/ScopeDescription";
import Logo from "components/Logo";
import {
  MainWrapper,
  TopNavWrapper,
  NavWrapper,
  PageWrapper,
  LogoWrapper,
  HelperWrapper,
  MainNavWrapper,
} from "components/Wrapper";
import { Navigation } from "components/Navigation";
import { topNavLinks, navLink } from "fixtures/navigation";
import { pageDescription } from "fixtures/page-desc";
import Link from "next/link";
import _ from "lodash";
import LayoutWrapper from "./LayoutWrapper";
import { useRef } from "react";
import SettingsDrawer, { ThemeSchemeProps } from "components/SettingsDrawer";
import useGlobalThemeScheme from "hooks/global-themes";
import { ThemeSchemeColors } from "~types/themes";

export type LayoutDefaultProps = {
  page: string;
  scope: string;
  statusCode: number;
};

const LayoutDefault: React.FC<LayoutDefaultProps> = ({
  children,
  page,
  scope,
  statusCode,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colors } = useTheme();
  const btnRef = useRef();
  const scopeText = scope
    ? pageDescription[scope]
    : `Something error ${statusCode}`;

  const title = `Redwigs Admin / ${_.upperFirst(scope)} / ${_.upperFirst(
    page
  )}`;

  const [schemeName, currentScheme] = useGlobalThemeScheme();
  const colorsScheme = colors[schemeName] as ThemeSchemeColors;

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <SettingsDrawer btnRef={btnRef} isOpen={isOpen} onClose={onClose} />
      <MainWrapper>
        <TopNavWrapper>
          <Navigation
            navFor="scope"
            links={topNavLinks}
            page={page ?? ""}
            scope={scope ?? ""}
          />
        </TopNavWrapper>
        <NavWrapper>
          <LogoWrapper>
            <Link href="/">
              <a>
                <Logo />
              </a>
            </Link>
          </LogoWrapper>
          <ScopeDescription text={scopeText} />
          <MainNavWrapper>
            <Navigation
              navFor="page"
              links={scope ? navLink[scope] : []}
              page={page ?? ""}
              scope={scope ?? ""}
            />
          </MainNavWrapper>
          <HelperWrapper>
            <IconButton
              ref={btnRef}
              onClick={onOpen}
              variantColor={`${schemeName}Buttons`}
              color={currentScheme.foreground}
              borderWidth={1}
              borderColor={currentScheme.border}
              aria-label="Search database"
              icon="settings"
              size="sm"
              alignSelf="center"
            />
          </HelperWrapper>
        </NavWrapper>
        <PageWrapper>
          <LayoutWrapper scope={scope} page={page}>
            {children}
          </LayoutWrapper>
        </PageWrapper>
      </MainWrapper>
      <style global jsx>
        {`
          html {
            background-color: ${colorsScheme.background};
          }

          html,
          body {
            background-color: ${colorsScheme.background};
            color: ${colorsScheme.foreground};
          }

          #nprogress .bar {
            background: ${colorsScheme.linksColor};
          }

          #nprogress .peg {
            box-shadow: 0 0 10px ${colorsScheme.linksColor},
              0 0 5px ${colorsScheme.linksColor};
          }

          #nprogress .spinner-icon {
            border-top-color: ${colorsScheme.linksColor};
            border-left-color: ${colorsScheme.linksColor};
          }
        `}
      </style>
    </>
  );
};

export default LayoutDefault;
