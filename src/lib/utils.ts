import { SearchParams } from "@/types";
import { type ClassValue, clsx } from "clsx";
import dayjs from "./dayjs";
import { ReadonlyURLSearchParams } from "next/navigation";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

export const createUrl = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams
) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;

  return `${pathname}${queryString}`;
};

export function objectToQueryString(obj: SearchParams = {}) {
  const queryParams = new URLSearchParams();

  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined) {
      if (Array.isArray(value)) {
        value.forEach((v) => queryParams.append(key, v));
      } else {
        queryParams.append(key, value);
      }
    }
  }

  return queryParams.toString();
}

export function formatFileSize(bytes?: number) {
  if (!bytes) return "0 Bytes";

  bytes = Number(bytes);

  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = 2;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export function formatDate(date: string, format = "MMM D, YYYY") {
  return dayjs(date).format(format);
}
