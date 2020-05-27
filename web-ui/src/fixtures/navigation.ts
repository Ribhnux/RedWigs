import { NavLinkProps } from "components/NavLink";
import {
  FaDatabase,
  FaPaintBrush,
  FaQuestion,
  FaToolbox,
} from "react-icons/fa";
import { MdLoop, MdApps } from "react-icons/md";
import { AiOutlineExperiment, AiOutlineFileSearch } from "react-icons/ai";
import { BsGearFill } from "react-icons/bs";
import { GiStack } from "react-icons/gi";
import { FiLink } from "react-icons/fi";
import { Scope, DataPage } from "~types/scopes";

export const topNavLinks: NavLinkProps[] = [
  {
    name: Scope.Data,
    active: false,
    href: "/data/graphql",
    icon: FaDatabase,
    size: "sm",
    label: "Data",
    isDarker: true,
  },
  {
    name: Scope.Event,
    active: false,
    href: "/event/webhook",
    icon: MdLoop,
    size: "sm",
    label: "Event",
    isDarker: true,
  },
  {
    name: Scope.AppFn,
    active: false,
    href: "/appfn/io-types",
    icon: MdApps,
    size: "sm",
    label: "AppFn",
    isDarker: true,
  },
  {
    name: Scope.StateMachine,
    active: false,
    href: "/state-machine/fsm",
    icon: BsGearFill,
    size: "sm",
    label: "StateMachine",
    isDarker: true,
  },
  {
    name: Scope.DesignSystem,
    active: false,
    href: "/design-system/nano",
    icon: FaPaintBrush,
    size: "sm",
    label: "Design System",
    isDarker: true,
  },
  {
    name: Scope.Tools,
    active: false,
    href: "/tools",
    icon: FaToolbox,
    size: "sm",
    label: "Tools",
    isDarker: true,
  },
  {
    name: Scope.Help,
    active: false,
    href: "/help",
    icon: FaQuestion,
    size: "sm",
    label: "Help",
    isDarker: true,
  },
];

export const dataNavigationLinks: NavLinkProps[] = [
  {
    name: DataPage.GraphQL,
    active: false,
    href: "/data/graphql",
    icon: AiOutlineExperiment,
    label: "GraphQL IDE",
  },
  {
    name: DataPage.Collections,
    active: false,
    href: "/data/collections",
    icon: GiStack,
    label: "Collections",
  },
  {
    name: DataPage.Browse,
    active: false,
    href: "/data/browse",
    icon: AiOutlineFileSearch,
    label: "Browse",
  },
  {
    name: DataPage.REST,
    active: false,
    href: "/data/rest",
    icon: "rest",
    label: "REST",
  },
  {
    name: DataPage.gRPC,
    active: false,
    href: "/data/grpc",
    icon: "grpc",
    label: "gRPC",
  },
];

export const navLink = {
  data: dataNavigationLinks,
  event: [
    {
      name: "grpc",
      active: false,
      href: "/data/grpc",
      icon: "grpc",
      label: "gRPC",
    },
  ],
};
