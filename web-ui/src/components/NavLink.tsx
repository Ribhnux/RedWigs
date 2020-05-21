import Link from "next/link";
import { Box, Link as ChakraLink, Icon } from "@chakra-ui/core";
import { IconType } from "react-icons/lib/cjs";
import useGlobalThemeScheme from "hooks/global-themes";

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
  const [_, currentScheme] = useGlobalThemeScheme();
  const realColor = isDarker
    ? currentScheme.functionsColor
    : currentScheme.linksColor;

  const color = active ? realColor : currentScheme.foreground;

  return (
    <Link href={href} passHref>
      <ChakraLink
        fontSize={size}
        alignSelf="center"
        mr={2}
        ml={2}
        color={color}
        _focusWithin={{ boxShadow: "none" }}
        _hover={{ textDecor: "none", textShadow: "0 0 .65px, 0 0 .65px;" }}
        _focus={{ boxShadow: "none" }}
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
