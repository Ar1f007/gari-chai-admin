import { LucideIcon } from "lucide-react";

export type NavLinkItem = {
  label: string;
  href: string | NavLinkItem[];
  icon?: LucideIcon;
  hideIcon?: boolean;
};
