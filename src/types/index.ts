import { LucideIcon } from "lucide-react";

export type NavLinkItem = {
  label: string;
  href: string | NavLinkItem[];
  icon?: LucideIcon;
};

export interface SearchParams {
  [key: string]: string | string[] | undefined;
}

export type Option = {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
};

export interface DataTableFilterOption<TData> {
  id?: string;
  label: string;
  value: keyof TData | string;
  items: Option[];
  isMulti?: boolean;
}

export interface DataTableSearchableColumn<TData> {
  id: keyof TData;
  title: string;
}

export interface DataTableFilterableColumn<TData> {
  id: keyof TData;
  title: string;
  options: Option[];
}

export type Icon = LucideIcon;

export type Todo = any;
