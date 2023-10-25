export type TApiData<T> = {
  data: T;
  status: "success";
};

type TApiErrorData = {
  status: "error" | "fail";
  message: string;
};

type FieldError = {
  fieldName: string;
  message: string;
};

export type TApiValidationError = {
  status: "validationError";
  message: string;
  errors: FieldError[];
};

export type TApiError = TApiErrorData | TApiValidationError;

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

export type SelectOption = {
  value: string;
  label: string;
};

export type ImagePayload = {
  thumbnailUrl: string | null;
  originalUrl: string;
};
