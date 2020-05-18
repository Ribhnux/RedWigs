import Head from "next/head";
import { IconButton } from "@chakra-ui/core";
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
}) => (
  <>
    <Head>
      <title>
        Redwigs Admin &raquo; {scope} &raquo; {page}
      </title>
      <link rel="icon" href="/favicon.png" />
    </Head>
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
        <ScopeDescription
          text={
            scope ? pageDescription[scope] : `Something error ${statusCode}`
          }
        />
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
            size="sm"
            variant="outline"
            variantColor="teal"
            aria-label="Send email"
            icon="question"
          />
        </HelperWrapper>
      </NavWrapper>
      <PageWrapper>{children}</PageWrapper>
    </MainWrapper>
  </>
);

export default LayoutDefault;
