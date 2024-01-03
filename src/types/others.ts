export type TApiData<T> = {
  data: T;
  status: "success";
};

type TApiErrorData = {
  status: "error" | "fail";
  message: string;
};

type FieldError = {
  path: string[];
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
import { z } from "zod";
import { homeSettingSections } from "@/utils/constants";

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

export type SelectOption<TValue = string, TLabel = string, TImage = string> = {
  value: TValue;
  label: TLabel;
};

export type ImagePayload = {
  thumbnailUrl: string;
  originalUrl: string;
};

export type THomeSettingSectionNames = z.infer<typeof homeSettingSections>;

export type TPagination = {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  nextPage: number | null;
};
