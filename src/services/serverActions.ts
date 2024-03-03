"use server";

import { AUTH_TOKEN_NAME } from "@/utils/constants";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { ReqMethod, endpoints } from ".";
import { apiFetch } from "@/lib/api-fetch";
import {
  TAuthBasicUserInfo,
  userBasicInfoAPIResponseSchema,
} from "@/schemas/user";
import { TPagination } from "@/types/others";
import { z } from "zod";

export async function invalidateAdminCache(tags: string[]) {
  tags.forEach((tag) => revalidateTag(tag));
}

export async function invalidateAdminPathCache(
  paths: { path: string; type?: "layout" | "page" }[]
) {
  for (let i = 0; i < paths.length; i++) {
    revalidatePath(paths[i].path, paths[i].type);
  }
}

export async function getCookie() {
  return cookies().toString();
}
