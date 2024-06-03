"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";

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

export async function getCookie(token: string) {
  return cookies().get(token)?.value;
}
