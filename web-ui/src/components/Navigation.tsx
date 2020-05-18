import { Divider } from "@chakra-ui/core";
import NavLink, { NavLinkProps } from "./NavLink";
import { Fragment } from "react";

export type NavigationProps = {
  links: NavLinkProps[];
  page: string;
  scope: string;
  navFor: "scope" | "page";
};

export const NavDivider = () => (
  <Divider borderColor="gray.600" orientation="vertical" />
);

export const Navigation = ({ links, navFor, scope, page }: NavigationProps) => {
  const activeNav = navFor === "scope" ? scope : page;
  return (
    <>
      {links.map((linkProps, key) => (
        <Fragment key={key}>
          <NavLink {...linkProps} active={linkProps.name === activeNav} />
          {links.length - 1 !== key ? <NavDivider /> : null}
        </Fragment>
      ))}
    </>
  );
};
