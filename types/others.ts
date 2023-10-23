import { SVGProps } from "react";
import { LucideIcon } from "lucide-react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type NavLink = {
  title: string;
  href: string;
  icon?: LucideIcon;
};

export type NavItemGroup = {
  isGroup: true;
  groupName: string;
  icon: LucideIcon;
  links: NavLink[];
};

export type NavItemNormal = {
  isGroup: false;
} & NavLink;

export type NavItem = (NavItemGroup | NavLink)[];
