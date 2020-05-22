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
import { themeGraphQLSchemeMap } from "fixtures/theme";

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
  const editorTheme = themeGraphQLSchemeMap[schemeName];
  const cssFileName = editorTheme.replace(/(\s\w+)/g, "");
  const stylesheetHref = `https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.54.0/theme/${cssFileName}.css`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.png" />
        <link rel="stylesheet" href={stylesheetHref} />
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

          .CodeMirror .CodeMirror-cursor {
            border-left-color: ${colorsScheme.foreground};
          }

          .graphiql-container .topBar {
            background: ${colorsScheme.background};
            background: linear-gradient(
              180deg,
              ${colorsScheme.background} 0%,
              ${colorsScheme.secondBackground} 80%,
              ${colorsScheme.secondBackground} 100%
            );
            border-top-width: 1px;
            border-top-color: ${colorsScheme.border};
            border-bottom-color: ${colorsScheme.border};
          }

          .graphiql-container .result-window .CodeMirror-gutters {
            background-color: ${colorsScheme.secondBackground};
            border-color: ${colorsScheme.border};
            border-right-width: 2px;
          }

          .graphiql-container .result-window .CodeMirror {
            background: ${colorsScheme.background};
          }

          .graphiql-container .variable-editor-title {
            background: ${colorsScheme.background};
            border-bottom-color: ${colorsScheme.border};
            border-top-color: ${colorsScheme.border};
            color: ${colorsScheme.foreground};
          }

          .graphiql-container .doc-explorer-contents {
            background-color: ${colorsScheme.background};
            border-top-color: ${colorsScheme.border};
            border-left-color: ${colorsScheme.border};
            color: ${colorsScheme.foreground};
          }

          .graphiql-container .doc-explorer {
            background: ${colorsScheme.background};
          }

          .graphiql-container .docExplorerShow {
            background: linear-gradient(
              180deg,
              ${colorsScheme.background} 0%,
              ${colorsScheme.secondBackground} 100%
            );
            border-color: ${colorsScheme.border};
            color: ${colorsScheme.foreground};
          }

          .graphiql-container .docExplorerShow:before {
            border-left-color: ${colorsScheme.functionsColor};
            border-top-color: ${colorsScheme.functionsColor};
          }

          .graphiql-container .doc-explorer-title-bar {
            color: ${colorsScheme.foreground};
            border-color: ${colorsScheme.border};
          }

          .graphiql-container .resultWrap {
            border-left-color: ${colorsScheme.border};
          }

          .graphiql-container .search-box > input {
            background: ${colorsScheme.secondBackground};
            color: ${colorsScheme.foreground};
            padding-left: 1.5rem;
          }

          .graphiql-container .search-box-icon {
            padding-left: 0.5rem;
            color: ${colorsScheme.foreground};
          }

          .graphiql-container .docExplorerHide {
            color: ${colorsScheme.foreground};
          }

          .graphiql-container .arg-name {
            color: ${colorsScheme.parametersColor};
          }

          .graphiql-container .field-short-description {
            color: ${colorsScheme.text};
          }

          .graphiql-container .doc-category-item {
            color: ${colorsScheme.foreground};
          }

          .graphiql-container .field-name {
            color: ${colorsScheme.functionsColor};
          }
          .graphiql-container .type-name {
            color: ${colorsScheme.keywordsColor};
          }

          .graphiql-container .keyword {
            color: ${colorsScheme.attributesColor};
          }

          .graphiql-container .doc-explorer-back {
            color: ${colorsScheme.functionsColor};
            font-weight: 500;
          }

          .graphiql-container .title {
            color: ${colorsScheme.foreground};
          }

          .graphiql-container .execute-button {
            background: none;
            background: linear-gradient(
              180deg,
              ${colorsScheme._buttons[400]} 0%,
              ${colorsScheme._buttons[500]} 50%,
              ${colorsScheme._buttons[600]} 100%
            );
            box-shadow: 0 1px 0 ${colorsScheme._buttons[700]};
            fill: ${colorsScheme.foreground};
          }

          .graphiql-container .execute-button:active {
            background: none;
            background-color: ${colorsScheme.buttons};
            background: linear-gradient(
              180deg,
              ${colorsScheme._buttons[500]} 0%,
              ${colorsScheme._buttons[600]} 50%,
              ${colorsScheme._buttons[700]} 100%
            );
            box-shadow: 0 1px 0 ${colorsScheme.border};
            fill: ${colorsScheme.text};
          }

          .graphiql-container .toolbar-button {
            background-color: ${colorsScheme.buttons};
            border: 1px solid ${colorsScheme._buttons[600]};
            background: linear-gradient(
              180deg,
              ${colorsScheme._buttons[400]} 0%,
              ${colorsScheme._buttons[500]} 50%,
              ${colorsScheme._buttons[600]} 100%
            );
            color: ${colorsScheme.foreground};
          }

          .graphiql-container .toolbar-button:hover {
            background-color: ${colorsScheme._buttons[600]};
            color: ${colorsScheme.foreground};
          }

          .graphiql-container .toolbar-button:active {
            background: none;
            box-shadow: none;
            box-shadow: ${colorsScheme._buttons[500]};
            background-color: ${colorsScheme._buttons[700]};
            background: linear-gradient(
              180deg,
              ${colorsScheme._buttons[500]} 0%,
              ${colorsScheme._buttons[600]} 50%,
              ${colorsScheme._buttons[700]} 100%
            );
            text-shadow: 0.1px 0.1px 1px ${colorsScheme.foreground};
          }

          .graphiql-container .history-title-bar {
            background: ${colorsScheme.background};
            color: ${colorsScheme.foreground};
          }

          .graphiql-container .history-title {
            flex: 1;
            padding: 0;
            overflow: unset;
            align-self: center;
          }

          .graphiql-container .historyPaneWrap {
            background: ${colorsScheme.background};
            background: linear-gradient(
              180deg,
              ${colorsScheme.background} 0%,
              ${colorsScheme.secondBackground} 80%,
              ${colorsScheme.secondBackground} 100%
            );
          }

          .graphiql-container .history-contents {
            background: ${colorsScheme.secondBackground};
            color: ${colorsScheme.foreground};
            border-top: 1px solid ${colorsScheme.border};
          }
          .graphiql-container .history-contents li {
            border-bottom: 1px ${colorsScheme.border};
          }

          .graphiql-container .history-contents > li:hover,
          .graphiql-container .history-contents > li:active {
            background: ${colorsScheme.selectionBackground};
          }

          .history-contents .history-label:focus,
          .history-contents .history-label:focus::before,
          .history-contents .history-label:focus::after {
            border: none;
            outline-color: none;
          }
        `}
      </style>
    </>
  );
};

export default LayoutDefault;
