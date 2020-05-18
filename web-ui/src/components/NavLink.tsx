import Link from "next/link";
import { Box, Link as ChakraLink, Icon } from "@chakra-ui/core";
import { IconType } from "react-icons/lib/cjs";

export type NavLinkProps = {
  name: string;
  href: string;
  icon: IconType | string;
  label: string;
  active?: boolean;
  isDarker?: boolean;
  size?: string;
};

const NavLink = ({
  href,
  icon,
  label,
  active = false,
  size = "md",
  isDarker = false,
}: NavLinkProps) => {
  const realColor = isDarker ? "red.600" : "red.400";
  const hoverColor = isDarker ? "red.700" : "red.500";
  const color = active ? realColor : "";
  return (
    <Link href={href} passHref>
      <ChakraLink
        fontSize={size}
        alignSelf="center"
        mr={2}
        ml={2}
        color={color}
        _hover={{ textDecor: "none", color: hoverColor }}
      >
        {typeof icon === "string" ? (
          <Icon name={icon} />
        ) : (
          <Box as={icon} display="inline" />
        )}{" "}
        {label}
      </ChakraLink>
    </Link>
  );
};

export default NavLink;
