import { NavLinkProps } from "components/NavLink";
import { FaDatabase, FaPaintBrush } from "react-icons/fa";
import { MdLoop, MdApps } from "react-icons/md";
import { AiOutlineExperiment, AiOutlineFileSearch } from "react-icons/ai";
import { BsGearFill } from "react-icons/bs";
import { GiStack } from "react-icons/gi";
import { FiLink } from "react-icons/fi";

export const topNavLinks: NavLinkProps[] = [
  {
    name: "data",
    active: false,
    href: "/data/graphiql",
    icon: FaDatabase,
    size: "sm",
    label: "Data",
    isDarker: true,
  },
  {
    name: "event",
    active: false,
    href: "/event/webhook",
    icon: MdLoop,
    size: "sm",
    label: "Event",
    isDarker: true,
  },
  {
    name: "appfn",
    active: false,
    href: "/appfn/io-types",
    icon: MdApps,
    size: "sm",
    label: "AppFn",
    isDarker: true,
  },
  {
    name: "state-machine",
    active: false,
    href: "/state-machine/fsm",
    icon: BsGearFill,
    size: "sm",
    label: "StateMachine",
    isDarker: true,
  },
  {
    name: "ui",
    active: false,
    href: "/ui/nano",
    icon: FaPaintBrush,
    size: "sm",
    label: "Components",
    isDarker: true,
  },
];

export const dataNavigationLinks: NavLinkProps[] = [
  {
    name: "graphiql",
    active: false,
    href: "/data/graphiql",
    icon: AiOutlineExperiment,
    label: "GraphiQL",
  },
  {
    name: "collections",
    active: false,
    href: "/data/collections",
    icon: GiStack,
    label: "Collections",
  },
  {
    name: "browse",
    active: false,
    href: "/data/browse",
    icon: AiOutlineFileSearch,
    label: "Browse",
  },
  {
    name: "rest",
    active: false,
    href: "/data/rest",
    icon: "rest",
    label: "REST",
  },
  {
    name: "grpc",
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
