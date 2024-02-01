"use server";

import { revalidatePath, revalidateTag } from "next/cache";

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
